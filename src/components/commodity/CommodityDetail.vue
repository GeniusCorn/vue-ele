<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue';
import ArrowCircleLeftRound from '@vicons/material/ArrowCircleLeftRound';
import { Icon } from '@vicons/utils';
import BScroll from '@better-scroll/core';
import * as commodity from '../../models/Commodity';
import CountItem from './CountItem.vue';
import CommentList from '../comment/CommentList.vue';

const props = defineProps<{
    name: string;
    title: string;
    price: number;
    show: boolean;
}>();

defineEmits(['close']);

const name = computed(() => props.name);

const show = computed(() => props.show);

const detailRef = ref();

// * 监听组件的 display 状态挂载/销毁滚动行为
// * 注意等待 DOM 刷新后再挂载滚动行为
watch(show, async () => {
    const scroll = new BScroll(detailRef.value, {
        probeType: 3,
        click: true,
    });

    if (show.value) {
        await nextTick();
        scroll.refresh();
    } else {
        await nextTick();
        scroll.destroy();
    }
});
</script>

<template>
    <Transition
        enter-active-class="animate__animated animate__slideInRight"
        leave-active-class="animate__animated animate__slideOutRight"
        name="custom-classes"
    >
        <div v-show="props.show" class="absolute inset-0 bg-slate-200">
            <div ref="detailRef" class="overflow-hidden h-full">
                <div>
                    <div class="absolute left-0 top-0" @click="$emit('close')">
                        <Icon color="rgb(96, 165, 250)" size="58">
                            <ArrowCircleLeftRound></ArrowCircleLeftRound>
                        </Icon>
                    </div>

                    <img
                        :alt="commodity[name].title"
                        :src="commodity[name].img"
                        class="h-96 w-screen object-cover"
                    />
                    <div class="relative bg-white p-6">
                        <div class="font-semibold">
                            {{ commodity[name].title }}
                        </div>
                        <div class="text-slate-400">
                            <span class="mr-2"
                                >月售 {{ commodity[name].monthly_sale }}</span
                            >
                            <span>好评 {{ commodity[name].praise }}</span>
                        </div>

                        <div class="text-red-400">
                            ￥ {{ commodity[name].price }}
                        </div>
                        <div class="absolute bottom-6 right-8">
                            <CountItem
                                :price="props.price"
                                :title="props.title"
                            ></CountItem>
                        </div>
                    </div>
                    <br />

                    <div class="p-6 bg-white">
                        <div class="font-semibold">商品信息</div>
                        <div>{{ commodity[name].description }}</div>
                    </div>
                    <br />

                    <div class="bg-white">
                        <div class="font-semibold p-6">商品评价</div>
                        <CommentList :title="props.title"></CommentList>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
@import 'https://cdn.staticfile.org/animate.css/4.1.1/animate.min.css';
</style>