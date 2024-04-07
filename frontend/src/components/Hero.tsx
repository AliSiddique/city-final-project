import React from 'react'

type Props = {}

export default function Hero({}: Props) {
  return (
    <div>
        <section className="lg:p-8 overflow-hidden">
  <div
    className="mx-auto 2xl:max-w-7xl py-24 lg:px-16 md:px-12 px-8 xl:px-40 items-center lg:py-40 w-full bg-gradientdown rounded-[3rem] overflow-hidden relative">
    <img
      className="sr-only lg:not-sr-only lg:absolute -mt-16 -right-64"
      src="/images/assets/cube.png"
      alt=""
    />
    <div className="max-w-xl">
      <div className="mb-8 flex">
        <span
          className="relative rounded-full px-3 py-1 text-sm leading-6 text-white ring-1 ring-white/10">
          Welcome to Buio
        </span>
      </div>
      <div className="mt-6">
        <h1
          className="text-3xl tracking-tight mt-6 font-light lg:text-4xl text-white">
          Buio is a UI KIt
          <span className="block text-zinc-400"> for your next idea.</span>
        </h1>

        <p className="text-white mt-6 text-balance">

          Transform your data into visually stunning infographics that captivate
          your audience. With a wide range of customizable templates and
          creative elements, you can present your data in a visually appealing
          and impactful way.
        </p>
        <div className="inline-flex flex-wrap items-center mt-8">
          <a
            href="/"
            title="link to your page"
            aria-label="your label"
            className="text-sm py-2 px-4 border focus:ring-2 rounded-full border-transparent bg-white hover:bg-white/10 text-black duration-200 focus:ring-offset-2 focus:ring-white hover:text-white inline-flex items-center justify-center ring-1 ring-transparent">
            Explore all pages
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}