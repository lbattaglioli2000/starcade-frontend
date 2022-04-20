<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-100">
    <body class="h-full overflow-hidden">
    ```
  -->
  <div class="h-full flex flex-col">
    <!-- Top nav-->
    <header class="flex-shrink-0 relative h-16 bg-white flex items-center">
      <!-- Logo area -->
      <div class="absolute inset-y-0 left-0 lg:static lg:flex-shrink-0">
        <a href="#" class="flex items-center justify-center h-16 w-16 bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 lg:w-20">
          <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white" alt="Workflow" />
        </a>
      </div>

      <!-- Picker area -->
      <div class="mx-auto lg:hidden">
        <div class="relative">
          <label for="inbox-select" class="sr-only">Choose inbox</label>
          <select id="inbox-select" class="rounded-md border-0 bg-none pl-3 pr-8 text-base font-medium text-gray-900 focus:ring-2 focus:ring-blue-600">
            <option value="/open">Open</option>
            <option value="/archived">Archived</option>
            <option value="/assigned">Assigned</option>
            <option value="/flagged">Flagged</option>
            <option value="/spam">Spam</option>
            <option value="/drafts">Drafts</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-2">
            <ChevronDownIcon class="h-5 w-5 text-gray-500" aria-hidden="true" />
          </div>
        </div>
      </div>

      <!-- Menu button area -->
      <div class="absolute inset-y-0 right-0 pr-4 flex items-center sm:pr-6 lg:hidden">
        <!-- Mobile menu button -->
        <button type="button" class="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600" @click="open = true">
          <span class="sr-only">Open main menu</span>
          <MenuIcon class="block h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <!-- Desktop nav area -->
      <div class="hidden lg:min-w-0 lg:flex-1 lg:flex lg:items-center lg:justify-between">
        <div class="min-w-0 flex-1">
          <div class="max-w-2xl relative text-gray-400 focus-within:text-gray-500">
            <label for="desktop-search" class="sr-only">Search all inboxes</label>
            <input id="desktop-search" type="search" placeholder="Search all inboxes" class="block w-full border-transparent pl-12 placeholder-gray-500 focus:border-transparent sm:text-sm focus:ring-0" />
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4">
              <SearchIcon class="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
        </div>
        <div class="ml-10 pr-4 flex-shrink-0 flex items-center space-x-10">
          <nav aria-label="Global" class="flex space-x-10">
            <template v-for="item in navigation" :key="item.name">
              <Menu as="div" v-if="item.children.length" class="relative text-left">
                <MenuButton class="flex items-center text-sm font-medium text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
                  <span>{{ item.name }}</span>
                  <ChevronDownIcon class="ml-1 h-5 w-5 text-gray-500" aria-hidden="true" />
                </MenuButton>

                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                  <MenuItems class="origin-top-right absolute z-30 right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="py-1">
                      <MenuItem v-for="child in item.children" :key="child.name" v-slot="{ active }">
                        <a :href="child.href" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                          {{ child.name }}
                        </a>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
              <a v-else :href="item.href" class="text-sm font-medium text-gray-900">{{ item.name }}</a>
            </template>
          </nav>
          <div class="flex items-center space-x-8">
            <span class="inline-flex">
              <a href="#" class="-mx-1 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500">
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </a>
            </span>

            <Menu as="div" class="relative inline-block text-left">
              <MenuButton class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600">
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt="" />
              </MenuButton>

              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="origin-top-right absolute z-30 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"> Your Profile </a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"> Sign Out </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide this `div` based on menu open/closed state -->
      <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="fixed inset-0 z-40 lg:hidden" @close="open = false">
          <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
            <DialogOverlay class="hidden sm:block sm:fixed sm:inset-0 sm:bg-gray-600 sm:bg-opacity-75" />
          </TransitionChild>

          <TransitionChild as="template" enter="transition ease-out duration-150 sm:ease-in-out sm:duration-300" enter-from="transform opacity-0 scale-110 sm:translate-x-full sm:scale-100 sm:opacity-100" enter-to="transform opacity-100 scale-100 sm:translate-x-0 sm:scale-100 sm:opacity-100" leave="transition ease-in duration-150 sm:ease-in-out sm:duration-300" leave-from="transform opacity-100 scale-100 sm:translate-x-0 sm:scale-100 sm:opacity-100" leave-to="transform opacity-0 scale-110 sm:translate-x-full sm:scale-100 sm:opacity-100">
            <nav class="fixed z-40 inset-0 h-full w-full bg-white sm:inset-y-0 sm:left-auto sm:right-0 sm:max-w-sm sm:w-full sm:shadow-lg" aria-label="Global">
              <div class="h-16 flex items-center justify-between px-4 sm:px-6">
                <a href="#">
                  <img class="block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=cyan&shade=400" alt="Workflow" />
                </a>
                <button type="button" class="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600" @click="open = false">
                  <span class="sr-only">Close main menu</span>
                  <XIcon class="block h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="mt-2 max-w-8xl mx-auto px-4 sm:px-6">
                <div class="relative text-gray-400 focus-within:text-gray-500">
                  <label for="mobile-search" class="sr-only">Search all inboxes</label>
                  <input id="mobile-search" type="search" placeholder="Search all inboxes" class="block w-full border-gray-300 rounded-md pl-10 placeholder-gray-500 focus:border-blue-600 focus:ring-blue-600" />
                  <div class="absolute inset-y-0 left-0 flex items-center justify-center pl-3">
                    <SearchIcon class="h-5 w-5" aria-hidden="true" />
                  </div>
                </div>
              </div>
              <div class="max-w-8xl mx-auto py-3 px-2 sm:px-4">
                <template v-for="item in navigation" :key="item.name">
                  <a :href="item.href" class="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100">{{ item.name }}</a>
                  <a v-for="child in item.children" :key="child.name" :href="child.href" class="block rounded-md py-2 pl-5 pr-3 text-base font-medium text-gray-500 hover:bg-gray-100">{{ child.name }}</a>
                </template>
              </div>
              <div class="border-t border-gray-200 pt-4 pb-3">
                <div class="max-w-8xl mx-auto px-4 flex items-center sm:px-6">
                  <div class="flex-shrink-0">
                    <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
                  </div>
                  <div class="ml-3 min-w-0 flex-1">
                    <div class="text-base font-medium text-gray-800 truncate">{{ user.name }}</div>
                    <div class="text-sm font-medium text-gray-500 truncate">{{ user.email }}</div>
                  </div>
                  <a href="#" class="ml-auto flex-shrink-0 bg-white p-2 text-gray-400 hover:text-gray-500">
                    <span class="sr-only">View notifications</span>
                    <BellIcon class="h-6 w-6" aria-hidden="true" />
                  </a>
                </div>
                <div class="mt-3 max-w-8xl mx-auto px-2 space-y-1 sm:px-4">
                  <a v-for="item in userNavigation" :key="item.name" :href="item.href" class="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-50">{{ item.name }}</a>
                </div>
              </div>
            </nav>
          </TransitionChild>
        </Dialog>
      </TransitionRoot>
    </header>

    <!-- Bottom section -->
    <div class="min-h-0 flex-1 flex overflow-hidden">
      <!-- Narrow sidebar-->
      <nav aria-label="Sidebar" class="hidden lg:block lg:flex-shrink-0 lg:bg-gray-800 lg:overflow-y-auto">
        <div class="relative w-20 flex flex-col p-3 space-y-3">
          <a v-for="item in sidebarNavigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700', 'flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg']">
            <span class="sr-only">{{ item.name }}</span>
            <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
          </a>
        </div>
      </nav>

      <!-- Main area -->
      <main class="min-w-0 flex-1 border-t border-gray-200 xl:flex">
        <section aria-labelledby="message-heading" class="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last">
          <!-- Top section -->
          <div class="flex-shrink-0 bg-white border-b border-gray-200">
            <!-- Toolbar-->
            <div class="h-16 flex flex-col justify-center">
              <div class="px-4 sm:px-6 lg:px-8">
                <div class="py-3 flex justify-between">
                  <!-- Left buttons -->
                  <div>
                    <span class="relative z-0 inline-flex shadow-sm rounded-md sm:shadow-none sm:space-x-3">
                      <span class="inline-flex sm:shadow-sm">
                        <button type="button" class="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
                          <ReplyIcon class="mr-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                          <span>Reply</span>
                        </button>
                        <button type="button" class="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
                          <PencilIcon class="mr-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                          <span>Note</span>
                        </button>
                        <button type="button" class="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
                          <UserAddIcon class="mr-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                          <span>Assign</span>
                        </button>
                      </span>

                      <span class="hidden lg:flex space-x-3">
                        <button type="button" class="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
                          <ArchiveIconSolid class="mr-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                          <span>Archive</span>
                        </button>
                        <button type="button" class="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
                          <FolderDownloadIcon class="mr-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                          <span>Move</span>
                        </button>
                      </span>

                      <Menu as="span" class="-ml-px relative block sm:shadow-sm lg:hidden">
                        <div>
                          <MenuButton class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:rounded-md sm:px-3">
                            <span class="sr-only sm:hidden">More</span>
                            <span class="hidden sm:inline">More</span>
                            <ChevronDownIcon class="h-5 w-5 text-gray-400 sm:ml-2 sm:-mr-1" aria-hidden="true" />
                          </MenuButton>
                        </div>

                        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                          <MenuItems class="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div class="py-1">
                              <MenuItem v-slot="{ active }">
                                <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block sm:hidden px-4 py-2 text-sm']"> Note </a>
                              </MenuItem>
                              <MenuItem v-slot="{ active }">
                                <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block sm:hidden px-4 py-2 text-sm']"> Assign </a>
                              </MenuItem>
                              <MenuItem v-slot="{ active }">
                                <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']"> Archive </a>
                              </MenuItem>
                              <MenuItem v-slot="{ active }">
                                <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']"> Move </a>
                              </MenuItem>
                            </div>
                          </MenuItems>
                        </transition>
                      </Menu>
                    </span>
                  </div>

                  <!-- Right buttons -->
                  <nav aria-label="Pagination">
                    <span class="relative z-0 inline-flex shadow-sm rounded-md">
                      <a href="#" class="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
                        <span class="sr-only">Next</span>
                        <ChevronUpIcon class="h-5 w-5" aria-hidden="true" />
                      </a>
                      <a href="#" class="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
                        <span class="sr-only">Previous</span>
                        <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
                      </a>
                    </span>
                  </nav>
                </div>
              </div>
            </div>
            <!-- Message header -->
          </div>

          <div class="min-h-0 flex-1">

            <div class="bg-white pt-5 pb-6 shadow">
              <div class="px-4 sm:flex sm:justify-between sm:items-baseline sm:px-6 lg:px-8">
                <div class="sm:w-0 sm:flex-1">
                  <h1 id="message-heading" class="text-lg font-medium text-gray-900">Introduction</h1>
                  <p class="mt-1 text-sm text-gray-500 truncate"><b>2</b> decision points</p>
                </div>

                <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800"> Published </span>

                <Menu as="div" class="ml-3 relative inline-block text-left">
                  <div>
                    <MenuButton class="-my-2 p-2 rounded-full bg-white flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600">
                      <span class="sr-only">Open options</span>
                      <DotsVerticalIcon class="h-5 w-5" aria-hidden="true" />
                    </MenuButton>
                  </div>

                  <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <MenuItems class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div class="py-1">
                        <MenuItem v-slot="{ active }">
                          <button type="button" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'w-full flex justify-between px-4 py-2 text-sm']">
                            <span>Copy email address</span>
                          </button>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                          <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'flex justify-between px-4 py-2 text-sm']">
                            <span>Previous conversations</span>
                          </a>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                          <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'flex justify-between px-4 py-2 text-sm']">
                            <span>View original</span>
                          </a>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>

            <!-- Thread section-->
            <div>
              <!-- Passage-->
              <section class="py-4 px-6 md:px-8" aria-labelledby="passage-title">
                <div class="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                  <div class="divide-y divide-gray-200">
                    <div class="px-4 py-5 sm:px-6">
                      <h2 id="notes-title" class="text-lg font-medium text-gray-900">Story Passage</h2>
                    </div>
                    <div class="px-4 py-6 sm:px-6">
                      <div class="sm:col-span-2">
                        <div class="text-sm text-gray-800">
                          <p>
                            As the sun crept through the lip of the window frame, Jason was just stirring. It
                            had been a long day yesterday. The team had flown out to the island of La Palma
                            early the previous morning and had made their way to the base of the volcano. Today
                            was the most important day of the trip and Jason knew this, which was why he was
                            getting up at the break of dawn. He peeled his eyes open, yawned, stretched and the
                            rolled out of bed. Wiping the sleep from his eyes, he thought about the day ahead
                            and about their target of reaching the volcano’s summit. Jason was a young scientist
                            and this was his first trip to a real volcano. He had studied them in books but
                            never seen one up close. The thought of him finally seeing the steaming, churning
                            lava gave him goose bumps. He grinned to himself as he put his trekking boots on.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-6 sm:px-6">
                    <div class="flex space-x-3">
                      <div class="min-w-0 flex-1">
                        <form action="#">
                          <div class="flex items-center justify-between">
                            <a href="#" class="group inline-flex items-start text-sm space-x-2 text-gray-500 hover:text-gray-900">
                              <!-- Heroicon name: solid/question-mark-circle -->
                              <svg class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                              </svg>
                              <span> Learn more about Story Passages. </span>
                            </a>
                            <button type="submit" class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Edit Passage</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Decision Points-->
              <section class="py-4 px-6 md:px-8" aria-labelledby="decisions-title">
                <div class="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                  <div class="divide-y divide-gray-200">
                    <div class="px-4 py-5 sm:px-6">
                      <h2 id="notes-title" class="text-lg font-medium text-gray-900">Decision Points</h2>
                    </div>
                    <div class="px-4 py-6 sm:px-6">
                      <div class="sm:col-span-2">
                        <dd class="mt-1 text-sm text-gray-900">
                          <ul role="list" class="border border-gray-200 rounded-md divide-y divide-gray-200">
                            <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                              <div class="w-0 flex-1 flex items-center">
                                <svg class="flex-shrink-0 h-5 w-5 text-gray-400" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="icon-arrows-split" transform="translate(-2.000000, -2.000000)">
                                      <path d="M14.0012393,16.0012393 L10.5501847,12.5501847 C11.124204,10.7205939 12.1338022,9.03777064 13.5147186,7.65685425 L15.8786797,5.29289322 L14.2928932,3.70710678 C13.6629284,3.07714192 14.1090951,2 15,2 L21,2 C21.5522847,2 22,2.44771525 22,3 L22,9 C22,9.89090485 20.9228581,10.3370716 20.2928932,9.70710678 L18.7071068,8.12132034 L16.3431458,10.4852814 C14.8760956,11.9523315 14.0376718,13.9304974 14.0012393,16.0012393 Z" id="Path" fill="#A5B3BB"></path>
                                      <path d="M8.12132034,5.29289322 L10.4852814,7.65685425 C12.7357179,9.90729079 14,12.9595377 14,16.1421356 L14,21 C14,21.5522847 13.5522847,22 13,22 L11,22 C10.4477153,22 10,21.5522847 10,21 L10,16.1421356 C10,14.0204037 9.15714528,11.9855724 7.65685425,10.4852814 L5.29289322,8.12132034 L3.70710678,9.70710678 C3.07714192,10.3370716 2,9.89090485 2,9 L2,3 C2,2.44771525 2.44771525,2 3,2 L9,2 C9.89090485,2 10.3370716,3.07714192 9.70710678,3.70710678 L8.12132034,5.29289322 L8.12132034,5.29289322 Z" id="secondary" fill="#0D2B3E" fill-rule="nonzero"></path>
                                    </g>
                                  </g>
                                </svg>
                                <span class="ml-2 flex-1 w-0 truncate"> Pack up campsite, and go home. </span>
                              </div>
                              <div class="ml-4 flex-shrink-0">
                                <a href="#" class="font-medium text-blue-600 hover:text-blue-500"> Edit </a>
                              </div>
                            </li>

                            <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                              <div class="w-0 flex-1 flex items-center">
                                <svg class="flex-shrink-0 h-5 w-5 text-gray-400" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="icon-arrows-split" transform="translate(-2.000000, -2.000000)">
                                      <path d="M14.0012393,16.0012393 L10.5501847,12.5501847 C11.124204,10.7205939 12.1338022,9.03777064 13.5147186,7.65685425 L15.8786797,5.29289322 L14.2928932,3.70710678 C13.6629284,3.07714192 14.1090951,2 15,2 L21,2 C21.5522847,2 22,2.44771525 22,3 L22,9 C22,9.89090485 20.9228581,10.3370716 20.2928932,9.70710678 L18.7071068,8.12132034 L16.3431458,10.4852814 C14.8760956,11.9523315 14.0376718,13.9304974 14.0012393,16.0012393 Z" id="Path" fill="#A5B3BB"></path>
                                      <path d="M8.12132034,5.29289322 L10.4852814,7.65685425 C12.7357179,9.90729079 14,12.9595377 14,16.1421356 L14,21 C14,21.5522847 13.5522847,22 13,22 L11,22 C10.4477153,22 10,21.5522847 10,21 L10,16.1421356 C10,14.0204037 9.15714528,11.9855724 7.65685425,10.4852814 L5.29289322,8.12132034 L3.70710678,9.70710678 C3.07714192,10.3370716 2,9.89090485 2,9 L2,3 C2,2.44771525 2.44771525,2 3,2 L9,2 C9.89090485,2 10.3370716,3.07714192 9.70710678,3.70710678 L8.12132034,5.29289322 L8.12132034,5.29289322 Z" id="secondary" fill="#0D2B3E" fill-rule="nonzero"></path>
                                    </g>
                                  </g>
                                </svg>
                                <span class="ml-2 flex-1 w-0 truncate"> Abandon campsite, and press on. </span>
                              </div>
                              <div class="ml-4 flex-shrink-0">
                                <a href="#" class="font-medium text-blue-600 hover:text-blue-500"> Edit </a>
                              </div>
                            </li>
                          </ul>
                        </dd>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-6 sm:px-6">
                    <div class="flex space-x-3">
                      <div class="min-w-0 flex-1">
                        <form action="#">
                          <div class="flex items-center justify-between">
                            <a href="#" class="group inline-flex items-start text-sm space-x-2 text-gray-500 hover:text-gray-900">
                              <!-- Heroicon name: solid/question-mark-circle -->
                              <svg class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                              </svg>
                              <span> Learn more about Decision Points. </span>
                            </a>
                            <button type="submit" class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Add a Decision Point</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Discussion-->
              <section class="py-4 px-6 md:px-8" aria-labelledby="discussion-title">
                <div class="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                  <div class="divide-y divide-gray-200">
                    <div class="px-4 py-5 sm:px-6">
                      <h2 id="notes-title" class="text-lg font-medium text-gray-900">Discussion</h2>
                    </div>
                    <div class="px-4 py-6 sm:px-6">
                      <ul role="list" class="space-y-8">
                        <li>
                          <div class="flex space-x-3">
                            <div class="flex-shrink-0">
                              <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                            </div>
                            <div>
                              <div class="text-sm">
                                <a href="#" class="font-medium text-gray-900">Leslie Alexander</a>
                              </div>
                              <div class="mt-1 text-sm text-gray-700">
                                <p>Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.</p>
                              </div>
                              <div class="mt-2 text-sm space-x-2">
                                <span class="text-gray-500 font-medium">4d ago</span>
                                <span class="text-gray-500 font-medium">&middot;</span>
                                <button type="button" class="text-gray-900 font-medium">Reply</button>
                              </div>
                            </div>
                          </div>
                        </li>

                        <li>
                          <div class="flex space-x-3">
                            <div class="flex-shrink-0">
                              <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                            </div>
                            <div>
                              <div class="text-sm">
                                <a href="#" class="font-medium text-gray-900">Michael Foster</a>
                              </div>
                              <div class="mt-1 text-sm text-gray-700">
                                <p>Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.</p>
                              </div>
                              <div class="mt-2 text-sm space-x-2">
                                <span class="text-gray-500 font-medium">4d ago</span>
                                <span class="text-gray-500 font-medium">&middot;</span>
                                <button type="button" class="text-gray-900 font-medium">Reply</button>
                              </div>
                            </div>
                          </div>
                        </li>

                        <li>
                          <div class="flex space-x-3">
                            <div class="flex-shrink-0">
                              <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                            </div>
                            <div>
                              <div class="text-sm">
                                <a href="#" class="font-medium text-gray-900">Dries Vincent</a>
                              </div>
                              <div class="mt-1 text-sm text-gray-700">
                                <p>Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.</p>
                              </div>
                              <div class="mt-2 text-sm space-x-2">
                                <span class="text-gray-500 font-medium">4d ago</span>
                                <span class="text-gray-500 font-medium">&middot;</span>
                                <button type="button" class="text-gray-900 font-medium">Reply</button>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-6 sm:px-6">
                    <div class="flex space-x-3">
                      <div class="flex-shrink-0">
                        <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80" alt="">
                      </div>
                      <div class="min-w-0 flex-1">
                        <form action="#">
                          <div>
                            <label for="comment" class="sr-only">About</label>
                            <textarea id="comment" name="comment" rows="3" class="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md" placeholder="Add a note"></textarea>
                          </div>
                          <div class="mt-3 flex items-center justify-between">
                            <a href="#" class="group inline-flex items-start text-sm space-x-2 text-gray-500 hover:text-gray-900">
                              <!-- Heroicon name: solid/question-mark-circle -->
                              <svg class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                              </svg>
                              <span> Some HTML is okay. </span>
                            </a>
                            <button type="submit" class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Comment</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

          </div>
        </section>

        <!-- Message list-->
        <aside class="hidden xl:block xl:flex-shrink-0 xl:order-first">
          <div class="h-full relative flex flex-col w-96 border-r border-gray-200 bg-gray-100">
            <div class="flex-shrink-0">
              <div class="h-16 bg-white px-6 flex flex-col justify-center">
                <div class="flex items-baseline space-x-3">
                  <h2 class="text-lg font-medium text-gray-900">Inbox</h2>
                  <p class="text-sm font-medium text-gray-500">{{ messages.length }} messages</p>
                </div>
              </div>
              <div class="border-t border-b border-gray-200 bg-gray-50 px-6 py-2 text-sm font-medium text-gray-500">Sorted by date</div>
            </div>
            <nav aria-label="Message list" class="min-h-0 flex-1 overflow-y-auto">
              <ul role="list" class="border-b border-gray-200 divide-y divide-gray-200">
                <li v-for="message in messages" :key="message.id" class="relative bg-white py-5 px-6 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600">
                  <div class="flex justify-between space-x-3">
                    <div class="min-w-0 flex-1">
                      <a :href="message.href" class="block focus:outline-none">
                        <span class="absolute inset-0" aria-hidden="true" />
                        <p class="text-sm font-medium text-gray-900 truncate">{{ message.sender }}</p>
                        <p class="text-sm text-gray-500 truncate">{{ message.subject }}</p>
                      </a>
                    </div>
                    <time :datetime="message.datetime" class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">{{ message.date }}</time>
                  </div>
                  <div class="mt-1">
                    <p class="line-clamp-2 text-sm text-gray-600">
                      {{ message.preview }}
                    </p>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import {
  Dialog,
  DialogOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  ArchiveIcon as ArchiveIconSolid,
  ChevronDownIcon,
  ChevronUpIcon,
  DotsVerticalIcon,
  FolderDownloadIcon,
  PencilIcon,
  ReplyIcon,
  SearchIcon,
  UserAddIcon,
} from '@heroicons/vue/solid'
import {
  ArchiveIcon as ArchiveIconOutline,
  BanIcon,
  BellIcon,
  FlagIcon,
  InboxIcon,
  MenuIcon,
  PencilAltIcon,
  UserCircleIcon,
  XIcon,
} from '@heroicons/vue/outline'

const user = {
  name: 'Whitney Francis',
  email: 'whitney.francis@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  {
    name: 'Inboxes',
    href: '#',
    children: [
      { name: 'Technical Support', href: '#' },
      { name: 'Sales', href: '#' },
      { name: 'General', href: '#' },
    ],
  },
  { name: 'Reporting', href: '#', children: [] },
  { name: 'Settings', href: '#', children: [] },
]
const sidebarNavigation = [
  { name: 'Open', href: '#', icon: InboxIcon, current: true },
  { name: 'Archive', href: '#', icon: ArchiveIconOutline, current: false },
  { name: 'Customers', href: '#', icon: UserCircleIcon, current: false },
  { name: 'Flagged', href: '#', icon: FlagIcon, current: false },
  { name: 'Spam', href: '#', icon: BanIcon, current: false },
  { name: 'Drafts', href: '#', icon: PencilAltIcon, current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '#' },
]
const messages = [
  {
    id: 1,
    subject: 'Velit placeat sit ducimus non sed',
    sender: 'Gloria Roberston',
    href: '#',
    date: '1d ago',
    datetime: '2021-01-27T16:35',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
  },
  {
    id: 2,
    subject: 'Nemo mollitia repudiandae adipisci explicabo optio consequatur tempora ut nihil',
    sender: 'Virginia Abshire',
    href: '#',
    date: '1d ago',
    datetime: '2021-01-27T16:35',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
  },
  {
    id: 3,
    subject: 'Doloremque reprehenderit et harum quas explicabo nulla architecto dicta voluptatibus',
    sender: 'Kyle Gulgowski',
    href: '#',
    date: '1d ago',
    datetime: '2021-01-27T16:35',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
  },
  {
    id: 4,
    subject: 'Eos sequi et aut ex impedit',
    sender: 'Hattie Haag',
    href: '#',
    date: '1d ago',
    datetime: '2021-01-27T16:35',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
  },
  {
    id: 5,
    subject: 'Quisquam veniam explicabo',
    sender: 'Wilma Glover',
    href: '#',
    date: '1d ago',
    datetime: '2021-01-27T16:35',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
  },
  {
    id: 6,
    subject: 'Est ratione molestiae modi maiores consequatur eligendi et excepturi magni',
    sender: 'Dolores Morissette',
    href: '#',
    date: '1d ago',
    datetime: '2021-01-27T16:35',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
  },
  {
    id: 7,
    subject: 'Commodi deserunt aut veniam rem ipsam',
    sender: 'Guadalupe Walsh',
    href: '#',
    date: '1d ago',
    datetime: '2021-01-27T16:35',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
  },
  {
    id: 8,
    subject: 'Illo illum aut debitis earum',
    sender: 'Jasmine Hansen',
    href: '#',
    date: '1d ago',
    datetime: '2021-01-27T16:35',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
  },
  {
    id: 9,
    subject: 'Qui dolore iste ut est cumque sed',
    sender: 'Ian Volkman',
    href: '#',
    date: '1d ago',
    datetime: '2021-01-27T16:35',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
  },
  {
    id: 10,
    subject: 'Aut sed aut illum delectus maiores laboriosam ex',
    sender: 'Rafael Klocko',
    href: '#',
    date: '1d ago',
    datetime: '2021-01-27T16:35',
    preview:
      'Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.',
  },
]
const message = {
  subject: 'Re: New pricing for existing customers',
  sender: 'joearmstrong@example.com',
  status: 'Open',
  items: [
    {
      id: 1,
      author: 'Joe Armstrong',
      date: 'Yesterday at 7:24am',
      datetime: '2021-01-28T19:24',
      body: "<p>Thanks so much! Can't wait to try it out.</p>",
    },
    {
      id: 2,
      author: 'Monica White',
      date: 'Wednesday at 4:35pm',
      datetime: '2021-01-27T16:35',
      body: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada at ultricies tincidunt elit et, enim. Habitant nunc, adipiscing non fermentum, sed est a, aliquet. Lorem in vel libero vel augue aliquet dui commodo.</p>
        <p>Nec malesuada sed sit ut aliquet. Cras ac pharetra, sapien purus vitae vestibulum auctor faucibus ullamcorper. Leo quam tincidunt porttitor neque, velit sed. Tortor mauris ornare ut tellus sed aliquet amet venenatis condimentum. Convallis accumsan et nunc eleifend.</p>
        <p><strong style="font-weight: 600;">Monica White</strong><br/>Customer Service</p>
      `,
    },
    {
      id: 3,
      author: 'Joe Armstrong',
      date: 'Wednesday at 4:09pm',
      datetime: '2021-01-27T16:09',
      body: `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada at ultricies tincidunt elit et, enim. Habitant nunc, adipiscing non fermentum, sed est a, aliquet. Lorem in vel libero vel augue aliquet dui commodo.</p>
        <p>Nec malesuada sed sit ut aliquet. Cras ac pharetra, sapien purus vitae vestibulum auctor faucibus ullamcorper. Leo quam tincidunt porttitor neque, velit sed. Tortor mauris ornare ut tellus sed aliquet amet venenatis condimentum. Convallis accumsan et nunc eleifend.</p>
        <p>– Joe</p>
      `,
    },
  ],
}

export default {
  name: "EditStoryView",
  components: {
    Dialog,
    DialogOverlay,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
    ArchiveIconSolid,
    BellIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    DotsVerticalIcon,
    FolderDownloadIcon,
    MenuIcon,
    PencilIcon,
    ReplyIcon,
    SearchIcon,
    UserAddIcon,
    XIcon,
  },
  setup() {
    const open = ref(false)

    return {
      user,
      navigation,
      sidebarNavigation,
      userNavigation,
      messages,
      message,
      open,
    }
  },
}
</script>