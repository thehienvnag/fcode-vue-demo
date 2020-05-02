<template>
  <div class="table-container">
    <div class="d-flex">
      <span>
        <a-input-search
          placeholder="Search"
          style="width: 200px"
          @search="onSearch"
          :loading="searchLoading"
        />
        <a-button
          type="dashed"
          icon="redo"
          class="ml-20"
          :loading="refreshLoading"
          @click="refreshTableData"
        >
          Refresh
        </a-button>
      </span>
      <a-button type="secondary" icon="plus" @click="openModal"
        >New Student</a-button
      >
    </div>
    <a-table
      class="table-students"
      bordered
      :columns="columns"
      :dataSource="studentStore.students.content"
      :pagination="false"
    >
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          v-if="studentStore.students.content.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.id)"
        >
          <a-button type="danger" icon="delete"></a-button>
        </a-popconfirm>
        <a-button
          class="ml-20"
          type="primary"
          icon="edit"
          @click="() => openModalForEdit(record.id)"
        ></a-button>
      </template>
    </a-table>
    <a-pagination
      :total="studentStore.students.totalElements"
      :defaultPageSize="5"
      :defaultCurrent="1"
      @change="onChangePage"
      style="text-align: right"
    >
    </a-pagination>
    <input-modal ref="inputModal" />
  </div>
</template>

<script>
import Student from "../../data-types/Student";
import { mapState } from "vuex";
import {
  LOAD_STUDENTS,
  DELETE_STUDENT,
  SEARCH_STUDENTS,
} from "../../store/actions/action-types";
import { Table, Input, Popconfirm, Pagination, Button } from "ant-design-vue";
const { Search } = Input;
import "ant-design-vue/lib/table/style/css";
import "ant-design-vue/lib/input/style/css";
import "ant-design-vue/lib/popconfirm/style/css";
import InputModal from "../input-modal/InputModal";

const columns = [
  {
    title: "Student Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Operation",
    key: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

export default {
  name: "student-list",
  data: () => {
    return {
      columns: columns,
      currentPage: 1,
      specificStudent: Student,
      searchLoading: false,
      refreshLoading: false,
      //visible: false
    };
  },
  computed: mapState(["studentStore"]),
  // computed: {
  //   students() {
  //     return this.$store.state.studentStore.students;
  //   },
  // },
  created() {
    this.$store.dispatch(LOAD_STUDENTS);
  },
  methods: {
    refreshTableData() {
      this.refreshLoading = true;
      this.$store
        .dispatch(LOAD_STUDENTS, this.currentPage - 1)
        .finally(() => {
          this.refreshLoading = false;
        });
    },
    openModal() {
      this.$refs.inputModal.showModal();
    },
    openModalForEdit(id) {
      const studentForEdit = this.$store.getters.getStudentById(id);
      this.$refs.inputModal.showModalForEdit(studentForEdit);
    },
    // hideModal(){
    //   this.visible = false;
    // },
    onSearch(searchValue) {
      this.searchLoading = true;
      this.$store.dispatch(SEARCH_STUDENTS, searchValue).finally(() => {
        this.searchLoading = false;
      });
    },
    onDelete(key) {
      this.$store.dispatch(DELETE_STUDENT, key);
    },
    onChangePage(page) {
      this.currentPage = page;
      this.$store.dispatch(LOAD_STUDENTS, page - 1);
    },
  },
  components: {
    "a-input-search": Search,
    "a-table": Table,
    "a-popconfirm": Popconfirm,
    "a-pagination": Pagination,
    "a-button": Button,
    "input-modal": InputModal,
  },
};
</script>

<style>
.table-container {
  width: 50%;
  margin: 0 auto;
}
.table-students {
  margin: 10px 0;
}
.ml-20 {
  margin-left: 20px;
}
.d-flex {
  display: flex;
  justify-content: space-between;
}
</style>
