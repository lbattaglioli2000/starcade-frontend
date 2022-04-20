<template>
  <article :aria-labelledby="'story-title-' + story.id">
    <div>
      <div class="flex space-x-3">
        <div class="flex-shrink-0">
          <img class="h-10 w-10 rounded-full" :src="story.author.photoUrl" alt="" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium text-gray-900">
            <a :href="story.author.href" class="hover:underline">{{ story.author.name }}</a>
          </p>
          <p class="text-sm text-gray-500">
            <a :href="story.href" class="hover:underline">
              <time :datetime="story.datetime">{{ story.date }}</time>
            </a>
          </p>
        </div>
        <div class="flex-shrink-0 self-center flex">
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton class="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                <span class="sr-only">Open options</span>
                <DotsVerticalIcon class="h-5 w-5" aria-hidden="true" />
              </MenuButton>
            </div>

            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'flex px-4 py-2 text-sm']">
                      <StarIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span>Add to favorites</span>
                    </a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'flex px-4 py-2 text-sm']">
                      <CodeIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span>Embed</span>
                    </a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'flex px-4 py-2 text-sm']">
                      <FlagIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span>Report content</span>
                    </a>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
      <h2 :id="'story-title-' + story.id" class="mt-4 text-base font-medium text-gray-900">
        {{ story.title }}
      </h2>
    </div>
    <div class="mt-2 text-sm text-gray-700 space-y-4" v-html="story.synopsis" />
    <div class="mt-6 flex justify-between space-x-8">
      <div class="flex space-x-6">
                      <span class="inline-flex items-center text-sm">
                        <button type="button" class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                          <ThumbUpIcon class="h-5 w-5" aria-hidden="true" />
                          <span class="font-medium text-gray-900">{{ story.likes }}</span>
                          <span class="sr-only">likes</span>
                        </button>
                      </span>
        <span class="inline-flex items-center text-sm">
                        <button type="button" class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                          <ChatAltIcon class="h-5 w-5" aria-hidden="true" />
                          <span class="font-medium text-gray-900">{{ story.comments }}</span>
                          <span class="sr-only">replies</span>
                        </button>
                      </span>
        <span class="inline-flex items-center text-sm">
                        <button type="button" class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                          <EyeIcon class="h-5 w-5" aria-hidden="true" />
                          <span class="font-medium text-gray-900">{{ story.views }}</span>
                          <span class="sr-only">views</span>
                        </button>
                      </span>
      </div>
      <div class="flex text-sm">
                      <span class="inline-flex items-center text-sm">
                        <button type="button" class="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                          <ShareIcon class="h-5 w-5" aria-hidden="true" />
                          <span class="font-medium text-gray-900">Share</span>
                        </button>
                      </span>
      </div>
    </div>
  </article>
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
  ChatAltIcon,
  CodeIcon,
  DotsVerticalIcon,
  EyeIcon,
  FlagIcon,
  ShareIcon,
  StarIcon,
  ThumbUpIcon,
} from "@heroicons/vue/solid";

export default {
  name: "Story",
  props: ["story"],
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    ChatAltIcon,
    CodeIcon,
    DotsVerticalIcon,
    EyeIcon,
    FlagIcon,
    ShareIcon,
    StarIcon,
    ThumbUpIcon,
  },
};
</script>