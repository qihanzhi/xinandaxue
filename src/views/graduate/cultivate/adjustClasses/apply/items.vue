<!-- 排课冲突 -->
<template>
    <div class="app-container">
      <el-form
        :model="queryParams"
        ref="queryForm"
        size="small"
        :inline="true"
        v-show="showSearch"
        label-width="100px"
      >
        <div
          :class="{ 'search-max-form': false, 'search-min-form': true }"
          :style="{ height: expand ? 'auto' : '33px' }"
        >
          <div class="search-grid">
            <el-form-item
              :label="feild.name + ':'"
              :prop="feild.prop"
              v-for="feild in formFeild"
              :key="feild.prop"
            >
              <el-select
                clearable
                v-model="queryParams[feild.prop]"
                :placeholder="'请选择' + feild.name"
                v-if="feild.type === 'select'"
              >
                <el-option
                  v-for="item in type"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <el-input
                v-model="queryParams[feild.prop]"
                :placeholder="'请输入' + feild.name"
                v-if="feild.type === 'input'"
              />
            </el-form-item>
          </div>
          <div class="search-tool">
            <el-button size="mini" @click="resetQuery">重置</el-button>
            <el-button type="primary" size="mini" @click="handleQuery"
              >查询</el-button
            >
            <div
              v-show="!expand && false"
              @click="
                () => {
                  expand = !expand;
                }
              "
            >
              展开
              <i class="el-icon-arrow-down"></i>
            </div>
            <div
              v-show="expand && false"
              @click="
                () => {
                  expand = !expand;
                }
              "
            >
              收起
              <i class="el-icon-arrow-up"></i>
            </div>
          </div>
        </div>
      </el-form>
      <el-row :gutter="10" class="mb12 mt20">
        <el-col :span="1.5">
          <el-button
            type="primary"
            icon="CirclePlus"
            size="mini"
            @click="handleAdd"
            >新增</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button
            v-show="false"
            type="primary"
            plain
            icon="EditPen"
            size="mini"
            @click="handleUpdate"
            >编辑</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="danger"
            plain
            icon="Delete"
            size="mini"
            :disabled="ids.length < 1"
            @click="handleDelete"
            >批量删除</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
            v-show="false"
            >导出</el-button
          >
        </el-col>
        <right-toolbar
          v-show="false"
          :showSearch.sync="showSearch"
          @queryTable="getList"
        ></right-toolbar>
      </el-row>
      <el-table
        v-loading="loading"
        :data="data"
        @selection-change="handleSelectionChange"
        tooltip-effect="light"
        :height="expand ? 'calc(100% - 192px)' : 'calc(100% - 145px)'"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="类型" prop="type" show-overflow-tooltip />
        <el-table-column label="冲突" prop="name" show-overflow-tooltip />
        <el-table-column label="颜色" prop="color" width="160">
          <template v-slot="{ row, column }">
            <el-color-picker
              v-model="row[column.property]"
              :predefine="predefineColors"
              size="small"
            />
          </template>
        </el-table-column>
        <el-table-column label="开关" prop="status" width="160">
          <template v-slot="{ row, column }">
            <el-switch
              v-model="row[column.property]"
              active-color="#145fff"
              inactive-color="#f03f3c"
              @change="handleSwitch(row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template v-slot="{ row }">
            <div class="table-tool">
              <div @click="handleUpdate(row)">修改</div>
              <div class="line"></div>
              <div @click="handleSee(row)">查看</div>
              <div class="line"></div>
              <div class="red" @click="handleDelete(row)">删除</div>
            </div>
          </template>
        </el-table-column>
        <div slot="empty">
          <Empty></Empty>
        </div>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
      <!-- 添加或修改排课检查项对话框 -->
      <el-dialog :title="title" v-model="open" width="1200px" append-to-body>
        <el-form
          ref="dataForm"
          :model="form"
          :rules="rules"
          label-width="120px"
          :disabled="title.indexOf('查看') === 0"
          v-if="open"
        >
          <div class="title-square">基本信息</div>
          <div class="form-grid">
            <el-form-item label="类型:" prop="type">
              <el-select
                clearable
                v-model="form.type"
                placeholder="请选择冲突类型"
              >
                <el-option
                  v-for="item in type"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="冲突:" prop="name">
              <el-input v-model="form.name" placeholder="请输入冲突" />
            </el-form-item>
            <el-form-item label="颜色:" prop="color">
              <el-color-picker
                v-model="form.color"
                :predefine="predefineColors"
                size="small"
              />
            </el-form-item>
            <el-form-item label="开关:" prop="status">
              <el-switch
                v-model="form.status"
                active-color="#145fff"
                inactive-color="#f03f3c"
              ></el-switch>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button
            type="primary"
            @click="submitForm"
            v-show="title.indexOf('查看') !== 0"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script setup>
  import Empty from "@/components/Empty/index.vue";
  import useScoreItemsStore from "@/store/modules/scoreItem";
  const { proxy } = getCurrentInstance();
  const dataStore = useScoreItemsStore();
  // 弹出层标题
  const title = ref("");
  // 搜索展开
  const expand = ref(false);
  // 是否显示弹出层
  const open = ref(false);
  // 正在操作的第几行
  const updateIndex = ref(0);
  // 显示搜索条件
  const showSearch = ref(true);
  const loading = ref(false);
  // 总条数
  const total = ref(0);
  // 多选ids
  const ids = ref([]);
  const cols = ref([
    { name: "冲突", prop: "name" },
    { name: "颜色", prop: "color" },
    { name: "开关", prop: "status" },
  ]);
  const queryParams = ref({
    type: "",
    name: "",
    color: "",
    pageNum: 1,
    pageSize: 10,
  });
  const data = ref([]);
  const originData = ref([]);
  // 表单字段
  const formFeild = [
    { name: "类型", prop: "type", type: "select" },
    { name: "冲突", prop: "name", type: "input" },
  ];
  // 表单参数
  const form = ref({});
  // 表单校验
  const rules = ref({
    name: [{ required: true, message: "请输入冲突", trigger: "blur" }],
    color: [{ required: true, message: "请选择冲突颜色", trigger: "blur" }],
  });
  const type = ref([
    "上课时间冲突类",
    "上课时间屏蔽类",
    "要求学时不足类",
    "异常类",
    "漏排类",
    "教师资源不足",
    "节假日调整",
    "教师时间冲突",
    "教室冲突",
  ]);
  const predefineColors = ref([
    "#ff4500",
    "#ff8c00",
    "#ffd700",
    "#90ee90",
    "#00ced1",
    "#1e90ff",
    "#EE70BF",
    "#D0E897",
    "#CEADDA",
    "#7C8EF4",
    "hsva(120, 40, 94, 0.5)",
    "hsl(181, 100%, 37%)",
    "hsla(209, 100%, 56%, 0.73)",
    "#c7158577",
  ]);
  
  function getList() {
    originData.value = dataStore.data;
    originData.value.forEach((c, cIndex) => {
      c.color = c.color || predefineColors.value[cIndex];
    });
    data.value = originData.value.filter((f) => {
      let flag = true;
      for (let i in queryParams.value) {
        if (!["startTime", "endTime", "pageNum", "pageSize"].includes(i)) {
          if (queryParams.value[i] && f[i].indexOf(queryParams.value[i]) === -1) {
            flag = false;
          }
        }
        if (["startTime", "endTime"].includes(i)) {
          if (
            queryParams.value["startTime"] &&
            new Date(f["startTime"]) < new Date(queryParams.value["startTime"])
          ) {
            flag = false;
          }
          if (
            queryParams.value["endTime"] &&
            new Date(f["endTime"]) > new Date(queryParams.value["endTime"])
          ) {
            flag = false;
          }
        }
      }
      if (flag) {
        return true;
      }
    });
    total.value = data.value.length;
  }
  /** 搜索按钮操作 */
  function handleQuery() {
    queryParams.value.pageNum = 1;
    getList();
  }
  /** 重置按钮操作 */
  function resetQuery() {
    proxy.resetForm("queryForm");
    handleQuery();
  }
  // 多选框选中数据
  function handleSelectionChange(selection) {
    ids.value = [];
    selection.forEach((s) => {
      ids.value.push(getIndexByAttr(originData.value, "name", s.name));
    });
  }
  /** 新增按钮操作 */
  function handleAdd() {
    reset();
    form.value = {
      type: "节假日调整",
      name: "节假日提前结束",
      color: "#7C8EF4",
      status: true,
    };
    open.value = true;
    title.value = "添加排课检查项";
  }
  /** 修改按钮操作 */
  function handleUpdate(row) {
    reset();
    updateIndex.value = getIndexByAttr(data.value, "name", row.name);
    form.value = data.value[updateIndex.value];
    open.value = true;
    title.value = "修改排课检查项";
  }
  /** 查看按钮操作 */
  function handleSee(row) {
    reset();
    updateIndex.value = getIndexByAttr(data.value, "name", row.name);
    form.value = data.value[updateIndex.value];
    open.value = true;
    title.value = "查看排课检查项";
  }
  /* 表格单元编辑 */
  function tableEellChangeClosed(row) {
    updateUser(row).then((response) => {
      proxy.$modal.msgSuccess("修改成功");
      open.value = false;
      getList();
    });
  }
  /** 删除按钮操作 */
  function handleDelete(row) {
    proxy.$modal
      .confirm("是否确定删除？")
      .then(() => {
        if (row instanceof PointerEvent) {
          // 批量
          let temp = [];
          originData.value.forEach((o, oIndex) => {
            if (!ids.value.includes(oIndex)) {
              temp.push(o);
            }
          });
          originData.value = temp;
          dataStore.setData(originData.value);
          getList();
          proxy.$modal.msgSuccess("删除成功");
        } else {
          updateIndex.value = getIndexByAttr(originData.value, "name", row.name);
          originData.value.splice(updateIndex.value, 1);
          dataStore.setData(originData.value);
          getList();
          proxy.$modal.msgSuccess("删除成功");
        }
      })
      .catch(() => {});
  }
  /** 导出按钮操作 */
  function handleExport() {
    download(
      "system/user/export",
      {
        ...queryParams.value,
      },
      `user_${new Date().getTime()}.xlsx`
    );
  }
  /** 提交按钮 */
  function submitForm() {
    proxy.$refs["dataForm"].validate((valid) => {
      if (valid) {
        if (title.value.indexOf("修改") > -1) {
          updateIndex.value = getIndexByAttr(data.value, "name", row.name);
          cols.value.forEach((c) => {
            data.value[updateIndex.value][c.prop] = row[c.prop];
          });
          dataStore.setData(originData.value);
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        } else {
          data.value.push(form.value);
          dataStore.setData(originData.value);
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        }
      }
    });
  }
  // 取消按钮
  function cancel() {
    open.value = false;
    reset();
  }
  // 表单重置
  function reset() {
    proxy.resetForm("dataForm");
  }
  // 根据属性获取序号
  function getIndexByAttr(data, attr, value) {
    let res = -1;
    data.some((d, dIndex) => {
      if (d[attr] === value) {
        res = dIndex;
        return true;
      }
    });
    return res;
  }
  function handleSwitch(row) {
    updateIndex.value = getIndexByAttr(data.value, "name", row.name);
    cols.value.forEach((c) => {
      data.value[updateIndex.value][c.prop] = row[c.prop];
    });
    dataStore.setData(originData.value);
  }
  onMounted(() => {
    getList();
  });
  </script>
  
  <style lang="scss" scoped></style>
  