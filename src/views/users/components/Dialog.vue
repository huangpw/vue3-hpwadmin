<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="45%"
    @close="handleClose"
  >
    <el-form ref="formRef" :model="form" label-width="70px" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
        v-if="dialogTitle === '添加用户'"
      >
        <el-input v-model="form.password" type="password" show-password />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="form.mobile" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, ref, defineProps, watch } from "vue";
import { addUser, editUser } from "@/api/users";
import i18n from "@/i18n";
import { ElMessage } from "element-plus";

const props = defineProps({
  dialogTitle: {
    type: String,
    default: "",
    required: true,
  },
  dialogTableValue: {
    type: Object,
    default: () => {},
  },
});

const formRef = ref(null);
const form = ref({
  username: "",
  password: "",
  email: "",
  mobile: "",
});

const rules = ref({
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
  email: [
    {
      required: true,
      message: "请输入邮箱",
      trigger: "blur",
    },
    {
      type: "email",
      message: "请输入正确的邮箱",
      trigger: ["blur", "change"],
    },
  ],
  mobile: [
    {
      required: true,
      message: "请输入手机",
      trigger: "blur",
    },
  ],
});

watch(
  () => props.dialogTableValue,
  () => {
    form.value = props.dialogTableValue;
  },
  { deep: true, immediate: true }
);

const emits = defineEmits(["update:modelValue", "initUserList"]);

// 取消
const handleClose = () => {
  emits("update:modelValue", false);
};
// 确认
const handleConfirm = async () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      props.dialogTitle === "添加用户"
        ? await addUser(form.value)
        : await editUser(form.value);
      ElMessage({
        message: i18n.global.t("message.updeteSuccess"),
        type: "success",
      });
      emits("initUserList");
      handleClose();
    } else {
      ElMessage.error("请完善数据");
    }
  });
};
</script>

<style lang="scss" scoped></style>
