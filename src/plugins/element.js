import Vue from "vue";

import { Button, 
    Form, 
    FormItem, 
    Input,   
    Message, 
    Container, 
    Header, 
    Aside, 
    Main, 
    Menu,
    Submenu,
    MenuItemGroup,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Tooltip,
    Pagination,
    Dialog,
    Select,
    Option,
    DatePicker,
    MessageBox,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Tag,
    Upload,
    Autocomplete,
    Notification,
    Slider,
    Steps,
    Step
   } from "element-ui";

Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tooltip);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Select);
Vue.use(Option);
Vue.use(DatePicker);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Tag);
Vue.use(Upload); 
Vue.use(Autocomplete);
Vue.use(Slider);
Vue.use(Steps);
Vue.use(Step)
/* 将弹框组件挂载在vue上 */
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$notify = Notification;