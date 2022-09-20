<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7" class="header">
          <el-input
            :placeholder="$t('table.placeholder')"
            clearable
            v-model="queryForm.query"
          ></el-input>
        </el-col>
        <el-button type="primary" :icon="Search" @click="initGetUsers">{{
          $t("table.search")
        }}</el-button>
        <el-button type="primary" :icon="Plus" @click="handleDialogValue()">{{
          $t("table.adduser")
        }}</el-button>
      </el-row>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column
          v-for="(item, index) in options"
          :key="index"
          :prop="item.prop"
          :label="$t(`table.${item.label}`)"
          :width="item.width"
        >
          <template v-slot="{ row }" v-if="item.prop === 'mg_state'">
            <el-switch v-model="row.mg_state" @click="changeState(row)" />
          </template>
          <template v-slot="{ row }" v-else-if="item.prop === 'create_time'">
            {{ $filters(row.create_time) }}
          </template>
          <template #default="{ row }" v-else-if="item.prop === 'action'">
            <el-button
              type="primary"
              size="small"
              :icon="Edit"
              @click="handleDialogValue(row)"
            ></el-button>
            <el-button type="warning" size="small" :icon="Setting"></el-button>
            <el-button
              type="danger"
              size="small"
              :icon="Delete"
              @click="delUser(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :currentPage="queryForm.pagenum"
        :page-size="queryForm.pagesize"
        :page-sizes="[2, 5, 10, 15]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <Dialog
      v-model="dialogVisible"
      :dialogTitle="dialogTitle"
      v-if="dialogVisible"
      @initUserList="initGetUsers"
      :dialogTableValue="dialogTableValue"
    />
  </div>
</template>

<script setup>
import { Search, Plus, Edit, Setting, Delete } from "@element-plus/icons-vue";
import { ref } from "vue";
import { getUser, changeUserState, deleteUser } from "@/api/users";
import { options } from "./options";
import { ElMessage, ElMessageBox } from "element-plus";
import { useI18n } from "vue-i18n";
import Dialog from "./components/Dialog.vue";
import { isNull } from "@/utils/filters";

const i18n = useI18n();
const queryForm = ref({
  query: "",
  pagenum: 1,
  pagesize: 2,
});

const small = ref(false);
const disabled = ref(false);
const background = ref(false);
const total = ref(0);
const tableData = ref([]);
const dialogVisible = ref(false);
const dialogTitle = ref("");
const dialogTableValue = ref({});

const initGetUsers = async () => {
  const res = await getUser(queryForm.value);
  // console.log(res, "initGetUsers");
  tableData.value = res.users;
  total.value = res.total;
};
initGetUsers();

const handleSizeChange = (pagesize) => {
  queryForm.value.pagenum = 1;
  queryForm.value.pagesize = pagesize;
  initGetUsers();
};

const handleCurrentChange = (pagenum) => {
  queryForm.value.pagenum = pagenum;
  initGetUsers();
};

// 修改状态
const changeState = async (info) => {
  await changeUserState(info.id, info.mg_state);
  ElMessage({
    message: i18n.t("message.updeteSuccess"),
    type: "success",
  });
};

//新增 | 修改
const handleDialogValue = (row) => {
  if (isNull(row)) {
    dialogTitle.value = "添加用户";
    dialogTableValue.value = {};
  } else {
    dialogTitle.value = "编辑用户";
    dialogTableValue.value = JSON.parse(JSON.stringify(row));
  }
  dialogVisible.value = true;
};

// 删除数据 row
const delUser = (row) => {
  ElMessageBox.confirm(i18n.t("dialog.deleteTitle"), "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(async () => {
      await deleteUser(row.id);
      ElMessage({
        type: "success",
        message: "Delete completed",
      });
      initGetUsers();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}
::v-deep(.el-pagination) {
  padding-top: 16px;
  box-sizing: border-box;
  justify-content: right;
}
</style>
