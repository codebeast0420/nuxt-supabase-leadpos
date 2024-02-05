<template>
  <!-- facebook and instagaram div -->
  <div v-if="false">
    <div class="flex gap-5 border-b px-4 mt-12  mb-12">
      <p class="text-[#e74c3c] pb-7 border-b-2 border-[#e74c3c]">Facebook</p>
      <p class="text-[#6b7280]">Instagram</p>
    </div>
    <!-- //button -->
    <div class="grid grid-cols-2 gap-0 bg-[#f4f5f6] rounded-lg">
      <button class="px-10 py-2 rounded-lg border-2 my-[2px] bg-white">Desktop</button>
      <button class="px-10 py-2 text-[#6b7280]">Mobile</button>
    </div>
  </div>
  <div class="border rounded-lg max-w-[680px] pointer-events-none bg-white sticky" :style="`top: ${headerHeight + 20}px`">
    <!-- //logo and text section -->
    <div class="flex gap-3 items-center pt-5 px-4">
      <img class="w-[40px] h-[40px]" src="/images/leadpros-short-logo.png" alt="">
      <div>
        <div class="flex items-center gap-1">
          <strong class="text-sm">Leadpros</strong>
        </div>
        <div class="flex items-center gap-2">
          <h1 class="text-xs text-[#6b7280]">Sponsored ·</h1>
          <svg width="10" height="11" viewBox="0 0 8 9" class="-ml-1" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 8.5C2.93913 8.5 1.92172 8.07857 1.17157 7.32843C0.421427 6.57828 0 5.56087 0 4.5C0 3.43913 0.421427 2.42172 1.17157 1.67157C1.92172 0.921427 2.93913 0.5 4 0.5C5.06087 0.5 6.07828 0.921427 6.82843 1.67157C7.57857 2.42172 8 3.43913 8 4.5C8 5.56087 7.57857 6.57828 6.82843 7.32843C6.07828 8.07857 5.06087 8.5 4 8.5ZM4.8 7.6C5.41976 7.43944 5.97711 7.09667 6.4 6.616V4.1C6.18783 4.1 5.98434 4.01571 5.83431 3.86569C5.68429 3.71566 5.6 3.51217 5.6 3.3V1.728C5.23082 1.51566 4.82275 1.37963 4.4 1.328V1.7C4.4 1.91217 4.31571 2.11566 4.16569 2.26569C4.01566 2.41571 3.81217 2.5 3.6 2.5V2.9C3.6 3.11217 3.51571 3.31566 3.36569 3.46569C3.21566 3.61571 3.01217 3.7 2.8 3.7V4.5H4C4.21217 4.5 4.41566 4.58429 4.56569 4.73431C4.71571 4.88434 4.8 5.08783 4.8 5.3V7.6ZM3.2 7.6V6.5C2.98783 6.5 2.78434 6.41571 2.63431 6.26569C2.48429 6.11566 2.4 5.91217 2.4 5.7V5.3H2.2C2.04087 5.3 1.88826 5.23679 1.77574 5.12426C1.66321 5.01174 1.6 4.85913 1.6 4.7V3.7H0.9C0.688502 4.52214 0.811919 5.39461 1.24315 6.12583C1.67439 6.85705 2.37818 7.38725 3.2 7.6Z"
              fill="#6B7280" />
          </svg>
        </div>
      </div>

    </div>
    <div class="px-5 py-5">
      <p class="text-sm" v-html="template.primary_text"></p>
    </div>

    <!-- //main image -->
    <div class="w-full text-center">
      <img v-if="!campaignCreateImagePreviewUrl" class="w-[670px] h-[670px] object-cover inline-block" :src="template.images[0]" alt="">
      <img v-else :src="campaignCreateImagePreviewUrl" alt="">
    </div>
    <!-- //below image section -->
    <div class="flex sm:flex-row flex-col sm:justify-between  px-4 bg-[#f4f5f6] sm:items-center py-5">
      <div>
        <p class="text-sm text-[#6b7280]">LEADPROS.COM</p>
        <p class="font-bold">{{ template.heading_text }}</p>
        <p class="text-sm text-[#6b7280] truncate">{{ template.description }}</p>
      </div>
      <div>
        <button class="px-3 py-2 sm:mt-0 mt-3 rounded-lg bg-gray-200 font-bold">{{
          $t('campaign_template.preview.learn_more') }}</button>
      </div>
    </div>
    <!-- //likes image -->
    <div class="flex sm:flex-row flex-col sm:justify-between border-b mb-3 mx-4 py-2 sm:items-center text-sm">
      <div class="flex">
        <img class="border-1 border-white z-10 rounded-full" height="18" role="presentation" src="data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M16.0001 7.9996c0 4.418-3.5815 7.9996-7.9995 7.9996S.001 12.4176.001 7.9996 3.5825 0 8.0006 0C12.4186 0 16 3.5815 16 7.9996Z' fill='url(%23paint2_radial_15251_63610)' fill-opacity='.5'/%3E%3Cpath d='M7.3014 3.8662a.6974.6974 0 0 1 .6974-.6977c.6742 0 1.2207.5465 1.2207 1.2206v1.7464a.101.101 0 0 0 .101.101h1.7953c.992 0 1.7232.9273 1.4917 1.892l-.4572 1.9047a2.301 2.301 0 0 1-2.2374 1.764H6.9185a.5752.5752 0 0 1-.5752-.5752V7.7384c0-.4168.097-.8278.2834-1.2005l.2856-.5712a3.6878 3.6878 0 0 0 .3893-1.6509l-.0002-.4496ZM4.367 7a.767.767 0 0 0-.7669.767v3.2598a.767.767 0 0 0 .767.767h.767a.3835.3835 0 0 0 .3835-.3835V7.3835A.3835.3835 0 0 0 5.134 7h-.767Z' fill='%23fff'/%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(90 .0005 8) scale(7.99958)'%3E%3Cstop offset='.5618' stop-color='%230866FF' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%230866FF' stop-opacity='.1'/%3E%3C/radialGradient%3E%3CradialGradient id='paint2_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='rotate(45 -4.5257 10.9237) scale(10.1818)'%3E%3Cstop offset='.3143' stop-color='%2302ADFC'/%3E%3Cstop offset='1' stop-color='%2302ADFC' stop-opacity='0'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.3989' y1='2.3999' x2='13.5983' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2302ADFC'/%3E%3Cstop offset='.5' stop-color='%230866FF'/%3E%3Cstop offset='1' stop-color='%232B7EFF'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E" width="18">
        <img class="border-1 border-transparent -ml-[3px] rounded-full" height="18" role="presentation" src="data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cg clip-path='url(%23clip0_15251_63610)'%3E%3Cpath d='M15.9963 8c0 4.4179-3.5811 7.9993-7.9986 7.9993-4.4176 0-7.9987-3.5814-7.9987-7.9992 0-4.4179 3.5811-7.9992 7.9987-7.9992 4.4175 0 7.9986 3.5813 7.9986 7.9992Z' fill='url(%23paint0_linear_15251_63610)'/%3E%3Cpath d='M15.9973 7.9992c0 4.4178-3.5811 7.9992-7.9987 7.9992C3.5811 15.9984 0 12.417 0 7.9992S3.5811 0 7.9986 0c4.4176 0 7.9987 3.5814 7.9987 7.9992Z' fill='url(%23paint1_radial_15251_63610)'/%3E%3Cpath d='M7.9996 5.9081c-.3528-.8845-1.1936-1.507-2.1748-1.507-1.4323 0-2.4254 1.328-2.4254 2.6797 0 2.2718 2.3938 4.0094 4.0816 5.1589.3168.2157.7205.2157 1.0373 0 1.6878-1.1495 4.0815-2.8871 4.0815-5.159 0-1.3517-.993-2.6796-2.4254-2.6796-.9811 0-1.822.6225-2.1748 1.507Z' fill='%23fff'/%3E%3C/g%3E%3Cdefs%3E%3CradialGradient id='paint1_radial_15251_63610' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='matrix(0 7.9992 -7.99863 0 7.9986 7.9992)'%3E%3Cstop offset='.5637' stop-color='%23E11731' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23E11731' stop-opacity='.1'/%3E%3C/radialGradient%3E%3ClinearGradient id='paint0_linear_15251_63610' x1='2.3986' y1='2.4007' x2='13.5975' y2='13.5993' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23FF74AE'/%3E%3Cstop offset='.5001' stop-color='%23FA2E3E'/%3E%3Cstop offset='1' stop-color='%23FF5758'/%3E%3C/linearGradient%3E%3CclipPath id='clip0_15251_63610'%3E%3Cpath fill='%23fff' d='M-.001.0009h15.9992v15.9984H-.001z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E" width="18">
        <span class="ml-1 text-[#6b7280]">129</span>
      </div>
      <div class="sm:mt-0 mt-2">
        <p class="text-[#6b7280]">12 Comments 8 Shares</p>
      </div>
    </div>
    <!-- //like comint share button -->
    <div class="w-full  px-4 pb-4 text-sm">
      <div class=" w-full  py-1 flex justify-between items-center flex-wrap">
        <div class="flex items-center justify-between   gap-1 text-[#6b7280] ">
          <span>Like</span>
        </div>
        <div class="flex items-center justify-between gap-1 text-[#6b7280]">
          <span>Comment</span>
        </div>
        <div class="flex items-center justify-between  gap-1 text-[#6b7280]">
          <span>Share</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const campaignCreateImagePreviewUrl = useState('campaignCreateImagePreviewUrl')
const headerHeight = useState<number>('headerHeight')

defineProps({
  template: {
    type: Object,
    required: true
  }
})
</script>
