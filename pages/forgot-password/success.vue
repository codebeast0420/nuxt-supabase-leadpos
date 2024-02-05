<template>
    <section>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full sm:max-w-md xl:p-0">
                <div class="space-y-4 md:space-y-6">
                    <div class="text-center h-full -mx-3.5">
                        <svg class="inline-block mb-10" width="234" height="221" viewBox="0 0 234 221" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M116 85.0002C125.941 85.0002 134 92.8353 134 102.5C134 108.974 130.385 114.626 125.01 117.653L125 155H107L106.999 117.659C101.62 114.633 98 108.977 98 102.5C98 92.8353 106.059 85.0002 116 85.0002Z" fill="#FF5C4D"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M157.554 165.516C165.378 160.275 170.125 151.413 170.125 141.871V62.8599H63.875V141.871C63.875 151.413 68.6217 160.275 76.4457 165.516L117 192.683L157.554 165.516ZM117 219L64.2656 183.673C50.355 174.355 42 158.669 42 141.871V41.0002H192V141.871C192 158.669 183.645 174.355 169.734 183.673L117 219Z" fill="#FFC9BD"/>
                            <path d="M170.375 62.8599V62.6099H170.125H63.875H63.625V62.8599V141.871C63.625 151.496 68.4131 160.436 76.3066 165.723L116.861 192.891L117 192.984L117.139 192.891L157.693 165.723C165.587 160.436 170.375 151.496 170.375 141.871V62.8599ZM42.25 141.871V41.2502H191.75V141.871C191.75 158.586 183.436 174.194 169.595 183.465L117 218.699L64.4048 183.465C50.5637 174.194 42.25 158.586 42.25 141.871Z" stroke="#FF5C4C" stroke-width="0.5"/>
                            <path d="M222 155L219 158M219 158L216 161M219 158L222 161M219 158L216 155" stroke="#FF5C4C" stroke-width="3" stroke-linecap="round"/>
                            <path d="M8 78L5 81M5 81L2 84M5 81L8 84M5 81L2 78" stroke="#FFC9BD" stroke-width="3" stroke-linecap="round"/>
                            <path d="M182 215H178M178 215H174M178 215V219M178 215V211" stroke="#D4DAE3" stroke-width="3" stroke-linecap="round"/>
                            <path d="M35 23L50 17" stroke="#ABB1BB" stroke-width="3" stroke-linecap="round"/>
                            <path d="M192 27.1034V2M206.286 30L223.429 12.6207M207.714 44H232" stroke="#FF5C4C" stroke-width="3" stroke-linecap="round"/>
                            <circle cx="50" cy="210" r="3" stroke="#FFC9BD" stroke-width="3" stroke-linecap="round"/>
                            <circle cx="153" cy="6" r="4" stroke="#FFC9BD" stroke-width="3" stroke-linecap="round"/>
                        </svg>
                        <Heading size="medium" tag="h2">
                            {{ $t('general.passwordRestoredSuccessfully') }}
                        </Heading>
                    </div>
                    <NuxtLink to="/login" class="btn btn-primary w-full">
                        {{ $t('general.loginNow') }}
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>
