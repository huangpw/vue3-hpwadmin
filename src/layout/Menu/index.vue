<template>
  <el-menu
    :active-text-color="variables.menuActiveTextColor"
    :background-color="variables.menuBg"
    class="el-menu-vertical-demo"
    :default-active="defaultActive"
    text-color="#fff"
    router
    unique-opened
    :collapse="!$store.getters.siderType"
  >
    <el-sub-menu
      :index="item.id + ''"
      v-for="(item, index) in menusList"
      :key="item.id"
    >
      <template #title>
        <el-icon>
          <component :is="iconList[index]"></component>
        </el-icon>
        <span>{{ $t(`menus.${item.path}`) }}</span>
      </template>
      <el-menu-item
        v-for="it in item.children"
        :key="it.id"
        :index="`/${it.path}`"
        @click="savePath(it.path)"
      >
        <template #title>
          <el-icon>
            <component :is="icon"></component>
          </el-icon>
          <span>{{ $t(`menus.${it.path}`) }}</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { ref } from "vue";
import { menuList } from "@/api/menu";
import variables from "@/styles/variables.module.scss";

const iconList = ref(["user", "setting", "shop", "tickets", "pie-chart"]);
const icon = ref("menu");

// 选中项
const defaultActive = ref(sessionStorage.getItem("path") || "/users");
// 获取菜单数据
const menusList = ref();
const initMenuList = async () => {
  const res = await menuList();
  menusList.value = [...res];
};
initMenuList();

// 保存路径
const savePath = (path) => {
  sessionStorage.setItem("path", "/" + path);
};
</script>

<style lang="scss" scoped></style>
