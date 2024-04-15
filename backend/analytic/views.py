from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count
from django.db.models.functions import TruncDate
from datetime import timedelta  
from django.utils import timezone
from django.contrib.auth.models import User
from labelling.models import LabelledImagesAnalytics
from rest_framework import status
from log.models import Log
from labelling.models import LabelledImage
from django.db.models import Sum



# Create your views here.
# Get analytics view function to get analytics data for the last 7 days
@api_view(['GET'])
def get_analytics(request):
    try:

        user = User.objects.get(username=request.user)
        # Calculate the date 7 days ago from today
        seven_days_ago = timezone.now() - timedelta(days=6)
        
        # Get analytics data for the last 7 days
        analytics = LabelledImagesAnalytics.objects.filter(
            user=user,
            created_at__gte=seven_days_ago
        ).annotate(
            date=TruncDate('created_at')
        ).values('date').annotate(
            total_amount=Count('*')
        ).order_by('-date')
        total_prediction_times = LabelledImage.objects.filter(
            image__user=user,
            uploaded_at__lte=seven_days_ago
        ).aggregate(total_prediction_time=Sum('prediction_time'))
        

        today = timezone.now().date()
        yesterday = today - timedelta(days=1)
        day_before_yesterday = yesterday - timedelta(days=1)
        today = LabelledImagesAnalytics.objects.filter(
            user=user,
            created_at__lte=today
        ).count()
        print(today)
    
        yesterday = LabelledImagesAnalytics.objects.filter(
            user=user,
            created_at__lte=yesterday
        ).count()

        difference_from_yesterday =  today - yesterday
        print(f"differece {difference_from_yesterday}")
        # Calculate the difference between yesterday and the day before yesterday
        # Create a list of dates for the last 7 days
        date_list = [(seven_days_ago + timedelta(days=x)).date() for x in range(7)]

        # Convert the dates to string in the same format as in the analytics data
        date_strings = [date.strftime("%Y-%m-%d") for date in date_list]

        # Create a dictionary to store the analytics data for each date
        # Create a dictionary to store the analytics data for each date
        analytics_dict = {entry['date']: entry['total_amount'] for entry in analytics}

        # Populate missing dates with 0 total_amount
        for date_string in date_strings:
            if date_string not in analytics_dict:
                analytics_dict[date_string] = 0

        # Create a list of dictionaries containing date and total_amount
        analytics_data = [{'date': date, 'total_amount': total_amount} for date, total_amount in analytics_dict.items()]
        Log.objects.create(log="image.analytics",url="/api/analytics",method="GET", user=user)

        return Response({"analytics": analytics_data,"prediction_time":total_prediction_times['total_prediction_time']}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "User does not exist."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)