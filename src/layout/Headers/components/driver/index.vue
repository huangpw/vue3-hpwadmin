<template>
  <div id="guide" @click.prevent.stop="handleGuide">
    <svg-icon icon="guide"></svg-icon>
  </div>
</template>
<script setup>
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";
import { onMounted } from "vue";
import { steps } from "./steps";
import { watchLang } from "@/i18n/watchlang";
import i18n from "@/i18n";

const t = i18n.global.t;
let driver; // eslint-disable-line no-unused-vars

// 初始化
onMounted(() => {
  initDriver();
});

const initDriver = () => {
  driver = new Driver({
    animate: false, // Whether to animate or not(是否设置动画)
    opacity: 0.75, // Background opacity (0 means only popovers and without overlay)(背景不透明度（0表示只有弹出窗口，没有覆盖）)
    padding: 10, // Distance of element from around the edges(元素与边缘周围的距离)
    allowClose: true, // Whether the click on overlay should close or not(单击覆盖是否应关闭)
    overlayClickNext: false, // Whether the click on overlay should move next(单击覆盖是否应下一步移动)
    doneBtnText: t("driver.doneBtnText"), // Text on the final button(最终按钮上的文本)
    closeBtnText: t("driver.closeBtnText"), // Text on the close button for this step(此步骤的“关闭”按钮上的文本)
    stageBackground: "#ffffff", // Background color for the staged behind highlighted element(后台高亮显示元素的背景色)
    nextBtnText: t("driver.nextBtnText"), // Next button text for this step(此步骤的下一个按钮文本)
    prevBtnText: t("driver.prevBtnText"), // Previous button text for this step(此步骤的上一个按钮文本)
  });
};

// 监听
watchLang(initDriver);

// 启动引导页
const handleGuide = () => {
  driver.defineSteps(steps(t));
  driver.start();
};
</script>
<style lang="scss" scoped></style>
