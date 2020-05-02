<template>
  <span>
    <a-modal
      title="Student Profile"
      :visible="visible"
      :confirmLoading="confirmLoading"
      :ok-text="btnConfirm"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form :form="form">
        <a-form-item
          v-if="btnConfirm == 'Update'"
          v-bind="formItemLayout"
          label="Id"
        >
          <a-input
            :disabled="new Boolean(true)"
            v-decorator="[
              'id',
              {
                initialValue: studentForEdit.id,
              },
            ]"
          >
          </a-input>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Name">
          <a-input
            v-decorator="[
              'name',
              {
                rules: [
                  {
                    required: true,
                    message: 'This field is required!',
                  },
                ],
                initialValue: studentForEdit.name,
              },
            ]"
          >
          </a-input>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Email">
          <a-input
            v-decorator="[
              'email',
              {
                rules: [
                  {
                    type: 'email',
                    message: 'Email inputted is invalid!',
                  },
                  {
                    required: true,
                    message: 'This field is required!',
                  },
                ],
                initialValue: studentForEdit.email,
              },
            ]"
          >
          </a-input>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Phone">
          <a-input
            v-decorator="[
              'phone',
              {
                rules: [
                  {
                    min: 9,
                    max: 10,
                    message: 'Phone number inputted is invalid!',
                  },
                  {
                    required: true,
                    message: 'This field is required!',
                  },
                ],
                initialValue: studentForEdit.phone,
              },
            ]"
            style="width: 100%"
          >
            <a-select
              slot="addonBefore"
              v-decorator="['phonePrefix', { initialValue: '84' }]"
              style="width: 70px"
            >
              <a-select-option value="84">
                +84
              </a-select-option>
            </a-select>
          </a-input>
        </a-form-item>

        <!--<a-button type="primary" html-type="submit" class="align-center">
          Submit
        </a-button>-->
      </a-form>
    </a-modal>
  </span>
</template>

<script>
import Student from "../../data-types/Student";
import { mapState } from "vuex";
import { actionTypes } from "../../store/actions/studentActions";
const { saveStudent, updateStudent } = actionTypes;
import {
  Modal,
  Form,
  //Button,
  Input,
  Select,
} from "ant-design-vue";
const { Item } = Form;
const { Option } = Select;
const { success } = Modal;
import "ant-design-vue/lib/modal/style/css";
import "ant-design-vue/lib/form/style/css";
import "ant-design-vue/lib/button/style/css";
import "ant-design-vue/lib/input/style/css";
export default {
  data: () => {
    return {
      confirmLoading: false,
      btnConfirm: String,
      studentForEdit: Student,
      visible: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 16 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 16 },
          sm: { span: 14 },
        },
      },
    };
  },
  computed: mapState(["studentStore"]),
  components: {
    "a-modal": Modal,
    //"a-button": Button,
    "a-form-item": Item,
    "a-form": Form,
    "a-input": Input,
    "a-select": Select,
    "a-select-option": Option,
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, {
      name: "student",
    });
  },
  methods: {
    showModal() {
      this.btnConfirm = "Create";
      this.studentForEdit = new Student();
      this.form.resetFields();
      this.visible = true;
    },
    showModalForEdit(student) {
      this.btnConfirm = "Update";
      this.form.resetFields();
      this.visible = true;
      this.studentForEdit = student;
    },
    handleCancel() {
      this.visible = false;
    },
    handleOk() {
      this.form.validateFieldsAndScroll((err, formData) => {
        if (!err) {
          this.confirmLoading = true;
          if (this.btnConfirm == "Create") {
            this.handleCreate(formData);
          } else if (this.btnConfirm == "Update") {
            this.handleUpdate(formData);
          }
        }
      });
    },
    async handleUpdate(formData) {
      await this.$store.dispatch(updateStudent, formData);
      success({
        title: "Successful Message",
        content: this.$createElement("div", {}, [
          this.$createElement("p", "Student has been successfully updated!"),
        ]),
      });
      this.confirmLoading = false;
    },
    async handleCreate(formData) {
      await this.$store.dispatch(saveStudent, formData);
      success({
        title: "Successful Message",
        content: this.$createElement("div", {}, [
          this.$createElement("p", "Student has been successfully created!"),
        ]),
      });
      this.confirmLoading = false;
    },
  },
};
</script>

<style>
.align-center {
  text-align: center;
}
</style>
