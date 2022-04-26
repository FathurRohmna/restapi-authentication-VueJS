<template>
  <div class="relative bg-gray-100 z-10 w-full">
    <div class="relative py-4 px-6 sm:px-6 border-b border-gray-300 lg:px-8 bg-primaryCard">
      <div class="relative flex max-w-6xl mx-auto flex-grow-0 items-center justify-between sm:h-10">
        <router-link to="/" class="font-semibold text-gray-700">Home</router-link>
        <div>
          <router-link to="/login" class="text-white font-bold px-3 py-2 rounded outline-none focus:outline-none mr-1 mb-1 bg-yellow-700 active:bg-yellow-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">
            LOG IN
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-white relative w-full block px-6">
    <div class="relative z-1 mt-10 py-20 px-6 sm:py-6 md:pb-20 mx-auto md:w-11/12 lg:max-w-7xl">
      <div class="text-gray-100 flex w-full relative items-center">
        <div class="flex-1">
          <h1 class="text-gray-800 text-4xl font-bold my-4">Welcome in the Public page</h1>
          <h6 class="text-gray-700 mb-6">Everyone can access this page</h6>
          <div class='max-w-xl text-base md:text-lg text-gray-500'>
            <p class='my-4 tracking-wide'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus quaerat pariatur officia repellendus voluptatem quidem architecto, fuga facere necessitatibus nesciunt eligendi tempora placeat sit error autem non nemo debitis beatae!
            </p>
            <p class='my-4 tracking-wide'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus quaerat pariatur officia 
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
