import React from 'react'

type Props = {}
const listOne = [
    {
      title: "Capitalize",
      description:
        "Tap into capital opportunities spanning various industries, including SaaS, eCommerce, and more.",
    },
    {
      title: "Accelerate",
      description:
        "Boost customer acquisition by streamlining financing processes for enhanced convenience.",
    },
    {
      title: "Gain Insights",
      description:
        "Gain valuable insights into the well-being of your customer base and uncover growth opportunities.",
    },
    {
      title: "Flourish",
      description:
        "Develop a new revenue stream that aligns seamlessly with your primary growth objectives.",
    },
  ];
  const listTwo = [
    {
      title: "Expand",
      description:
        "Broaden your market reach by tapping into new demographics and territories, enhancing brand visibility.",
    },
    {
      title: "Innovate",
      description:
        "Leverage cutting-edge technology to introduce novel solutions that meet evolving customer needs.",
    },
    {
      title: "Optimize",
      description:
        "Enhance operational efficiency through strategic process improvements and technology integration.",
    },
    {
      title: "Secure",
      description:
        "Strengthen your cybersecurity measures to protect your business and customer data from threats.",
    },
  ];
  
  const listThree = [
    {
      title: "Transform",
      description:
        "Embrace digital transformation to streamline operations and improve customer engagement.",
    },
    {
      title: "Empower",
      description:
        "Equip your team with the tools and knowledge they need to drive success and foster innovation.",
    },
    {
      title: "Collaborate",
      description:
        "Foster a culture of collaboration by leveraging platforms that enable efficient teamwork and communication.",
    },
    {
      title: "Sustain",
      description:
        "Implement sustainable practices to ensure the long-term success and environmental responsibility of your business.",
    },
  ];
  
export default function Features({}: Props) {
  return (

<section className="lg:p-8">
  <div
    className="mx-auto 2xl:max-w-7xl py-12 lg:px-16 md:px-12 px-8 xl:px-36 items-center w-full">
    <div>
      <span className="text-blue-400"> Comparative Analysis</span>
      <h2
        className="text-3xl tracking-tight mt-6 font-light lg:text-4xl text-white">
        Comparative charts <span className="md:block text-zinc-400"
          >for complex data</span
        >
      </h2>
      <p className="mt-4 text-base text-white max-w-md">
        Make informed decisions with our comparative analysis charts. Compare
        multiple data sets side by side using our intuitive charts.
      </p>
    </div>
    <div
      className="flex flex-col w-full"
 >
      <div
        className="flex flex-col w-full"
        aria-labelledby="carousel-label"
        role="region"
       >
        <h2
          className="sr-only"
          id="carousel-label">
          Carousel
        </h2><span
          className="sr-only"
          id="carousel-content-label"
          >Carousel</span
        ><div
          className="grid grid-cols-1 lg:grid-cols-4 pb-6 border-b border-white/10">
          <div
            className="items-center inline-flex lg:col-start-4 lg:ml-auto lg:px-2 mb-4 order-last space-x-2">
            <button
              className="bg-white/5 hover:bg-white/10 focus:bg-transparent rounded-2xl inline-flex items-center text-center text-white p-4 ring-1 ring-white/10"
           
              ><span aria-hidden="true"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
              </span><span className="sr-only">Skip to previous slide page</span
              ></button
            >
            <button
              className="bg-white/5 hover:bg-white/10 focus:bg-transparent rounded-2xl inline-flex items-center text-center text-white p-4 ring-1 ring-white/10"
        
              ><span aria-hidden="true"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-zinc-600 hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </span><span className="sr-only">Skip to next slide page</span
              ></button
            >
          </div>
        </div>
        <ul
          className="flex gap-3 overflow-x-scroll pb-24 pt-12 scrollbar-hide snap-mandatory snap-x w-full"
          role="listbox"
          aria-labelledby="carousel-content-label"
         >
          <li
            className="items-center justify-center w-full flex flex-col shrink-0 snap-start"
            role="option"
            x-bind="disableNextAndPreviousButtons">
            <ul className="grid grid-cols-1 lg:grid-cols-4 gap-3 group h-full">
              {
                listOne.map((item) => (
                  <li className="bg-ebony shadow-inset rounded-3xl p-4">
                    <figure>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-circle-check text-white"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round">
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          />
                          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                          <path d="M9 12l2 2l4 -4" />
                        </svg>
                        <p className="font-medium leading-6 text-white mt-24">
                          {item.title}
                        </p>
                        <p className="text-xs mt-2 text-zinc-300">
                          {item.description}
                        </p>
                      </div>
                    </figure>
                  </li>
                ))
              }
            </ul>
          </li>
          <li
            className="items-center justify-center w-full flex flex-col shrink-0 snap-start"
            role="option"
            x-bind="disableNextAndPreviousButtons">
            <ul className="grid grid-cols-1 lg:grid-cols-4 gap-3 group h-full">
              {
                listTwo.map((item) => (
                  <li className="bg-ebony shadow-inset rounded-3xl p-4">
                    <figure>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-circle-check text-white"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round">
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          />
                          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                          <path d="M9 12l2 2l4 -4" />
                        </svg>
                        <p className="font-medium leading-6 text-white mt-24">
                          {item.title}
                        </p>
                        <p className="text-xs mt-2 text-zinc-300">
                          {item.description}
                        </p>
                      </div>
                    </figure>
                  </li>
                ))
              }
            </ul>
          </li><li
            className="items-center justify-center w-full flex flex-col shrink-0 snap-start"
            role="option"
            x-bind="disableNextAndPreviousButtons">
            <ul className="grid grid-cols-1 lg:grid-cols-4 gap-3 group h-full">
              {
                listThree.map((item) => (
                  <li className="bg-ebony shadow-inset rounded-3xl p-4">
                    <figure>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-circle-check text-white"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round">
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          />
                          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                          <path d="M9 12l2 2l4 -4" />
                        </svg>
                        <p className="font-medium leading-6 text-white mt-24">
                          {item.title}
                        </p>
                        <p className="text-xs mt-2 text-zinc-300">
                          {item.description}
                        </p>
                      </div>
                    </figure>
                  </li>
                ))
              }
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

  )
}