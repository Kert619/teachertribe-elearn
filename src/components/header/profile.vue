<template>
  <!-- <div class="flex items-center cursor-pointer gap-1">
    <p>Kert</p>

  </div> -->

  <div class="dropdown dropdown-bottom dropdown-end">
    <label
      tabindex="0"
      class="btn no-animation btn-ghost btn-xs m-1 flex-nowrap"
    >
      <span class="text-sm">{{ authStore.user.name }}</span>
      <IconChevronDown class="w-[15px] h-[15px]" />
    </label>
    <ul
      tabindex="0"
      class="dropdown-content z-[1] menu p-2 shadow bg-base-100 w-52"
    >
      <li><a class="active:!bg-base-300 active:!text-black">Profile</a></li>
      <li>
        <a
          class="active:!bg-base-300 active:!text-black"
          @click.prevent="handleLogout"
          >Logout</a
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
const authStore = useAuthStore();

async function handleLogout() {
  await authStore.logout();
}
</script>
