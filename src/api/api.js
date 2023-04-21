import service from "@/service.js";
import qs from "qs";
//登陆接口
export function login(loginForm) {
  return service({
    method: "post",
    url: "common/login?work_num=" + loginForm.work_num,
    data: {
      action: "signin",
      data: loginForm,
    },
  });
}
//注册接口
export function register(addForm) {
  return service({
    method: "post",
    url: "common/register",
    data: {
      action: "add_user",
      data: addForm,
    },
  });
}
//修改密码接口
export function passWd(modifyForm) {
  return service({
    method: "put",
    url:
      "common/reset?work_num=" + modifyForm.work_num + "&action=modify_passwd",
    data: {
      action: "modify_passwd",
      data: {
        first_name: modifyForm.first_name,
        work_num: modifyForm.work_num,
        email: modifyForm.email,
        work_time: modifyForm.work_time,
        university: modifyForm.university,
        password: modifyForm.password,
      },
    },
  });
}
//退出登陆接口
export function logOut() {
  return service({
    method: "post",
    url: "common/lognout",
    data: {
      action: "signout",
    },
  });
}
//查询个人信息接口
export function getUserInformation(work_num) {
  return service({
    method: "get",
    url: "common/person?action=list_person&work_num=" + work_num,
    data: {},
  });
}
//修改个人信息接口
export function editUserInformation(editForm) {
  return service({
    method: "put",
    url: "common/person?action=modify_person&work_num=" + editForm.work_num,
    data: {
      action: "modify_person",
      work_num: editForm.work_num,
      id: editForm.id,
      team_group: editForm.team_group,
      work_role: editForm.work_role,
      newdata: {
        language: editForm.language,
        english: editForm.english,
        dialect: editForm.dialect,
        small_language: editForm.small_language,
        platform_tool: editForm.platform_tool,
        label: editForm.label,
        hobby: editForm.hobby,
        work_num: editForm.work_num,
      },
    },
  });
}
//查询员工-个人产出
export function getEmployee(work_num, pagenum, pagesize, name) {
  return service({
    method: "get",
    url:
      "user/employee?action=list_info&work_num=" +
      work_num +
      "&pagenum=" +
      pagenum +
      "&pagesize=" +
      pagesize +
      "&keywords=" +
      name,
    data: {},
  });
}
//新增员工-个人产出
export function addEmployee(addForm) {
  return service({
    method: "post",
    url: "user/employee?action=add_info&work_num=" + addForm.work_num,
    data: {
      action: "add_info",
      data: {
        work_num: addForm.work_num,
        data_time: addForm.data_time,
        project_name: addForm.project_name,
        project_role: addForm.project_role,
        work_overtime: addForm.work_overtime,
        account: addForm.account,
        mark_time: addForm.mark_time,
        mark_number: addForm.mark_number,
        quality_time: addForm.quality_time,
        quality_number: addForm.quality_number,
        test_mark_time: addForm.test_mark_time,
        traing_time: addForm.traing_time,
        question_time: addForm.question_time,
        data_process_time: addForm.data_process_time,
        analyse_time: addForm.analyse_time,
        other_time: addForm.other_time,
        loss_time: addForm.loss_time,
        note: addForm.note,
        over_mark_time: addForm.over_mark_time,
        over_mark_number: addForm.over_mark_number,
        over_quality_time: addForm.over_quality_time,
        over_quality_number: addForm.over_quality_number,
        over_test_mark_time: addForm.over_test_mark_time,
        over_traing_time: addForm.over_traing_time,
        over_question_time: addForm.over_question_time,
        over_data_process_time: addForm.over_data_process_time,
        over_analyse_time: addForm.over_analyse_time,
        over_other_time: addForm.over_other_time,
        over_loss_time: addForm.over_loss_time,
        over_note: addForm.over_note,
      },
    },
  });
}
//修改员工-个人产出
export function editEmployee(editForm) {
  return service({
    method: "put",
    url:
      "user/employee?action=modify_info&work_num=" +
      editForm.work_num +
      "&id=" +
      editForm.id,
    data: {
      action: "modify_info",
      id: editForm.id,
      newdata: editForm,
    },
  });
}
//删除员工-个人产出
export function removeEmployee(work_num, id) {
  return service({
    method: "delete",
    url: "user/employee?action=del_info&work_num=" + work_num + "&id=" + id,
    data: {},
  });
}
//查询员工-质量数据
export function getRecording(work_num, pagenum, pagesize, names, packets) {
  return service({
    method: "get",
    url:
      "user/recording/v1?action=list_info&work_num=" +
      work_num +
      "&pagenum=" +
      pagenum +
      "&pagesize=" +
      pagesize +
      "&keywords=" +
      names +
      "/" +
      packets,
    data: {},
  });
}
//查询员工-质量数据-无关键词
export function getRecordingNoKey(work_num, pagenum, pagesize) {
  return service({
    method: "get",
    url:
      "user/recording/v1?action=list_info&work_num=" +
      work_num +
      "&pagenum=" +
      pagenum +
      "&pagesize=" +
      pagesize,
    data: {},
  });
}
//新增员工-质量数据
export function addRecording(addFrom) {
  return service({
    method: "post",
    url: "user/recording/v1?action=add_info&work_num=" + addFrom.work_num,
    data: {
      action: "add_info",
      newdata: {
        project_id: addFrom.project_id,
        project_name: addFrom.project_name,
        packet_id: addFrom.packet_id,
        subtask_id: addFrom.subtask_id,
        accept_time: addFrom.accept_time || undefined,
        supplier: addFrom.supplier || undefined,
        return_times: addFrom.return_times || undefined,
        type_job: addFrom.type_job || undefined,
        besampl_email: addFrom.besampl_email || undefined,
        besampl_man: addFrom.besampl_man || undefined,
        besampl_num: addFrom.besampl_num || undefined,
        besamp_err: addFrom.besamp_err || undefined,
        appeal_num: addFrom.appeal_num || undefined,
        appeal_pass: addFrom.appeal_pass || undefined,
        sampl_email: addFrom.sampl_email || undefined,
        note: addFrom.note || undefined,
        work_num: addFrom.work_num || undefined,
      },
    },
  });
}
//修改员工-质量数据
export function editRecording(editForm) {
  return service({
    method: "put",
    url:
      "user/recording/v1?action=modify_info&work_num=" +
      editForm.work_num +
      "&id=" +
      editForm.id,
    data: {
      action: "modify_info",
      id: editForm.id,
      newdata: {
        project_id: editForm.project_id || undefined,
        project_name: editForm.project_name || undefined,
        packet_id: editForm.packet_id || undefined,
        subtask_id: editForm.subtask_id || undefined,
        accept_time: editForm.accept_time || undefined,
        supplier: editForm.supplier || undefined,
        return_times: editForm.return_times || undefined,
        type_job: editForm.type_job || undefined,
        besampl_email: editForm.besampl_email || undefined,
        besampl_man: editForm.besampl_man || undefined,
        besampl_num: editForm.besampl_num || undefined,
        besamp_err: editForm.besamp_err || undefined,
        appeal_num: editForm.appeal_num || undefined,
        appeal_pass: editForm.appeal_pass || undefined,
        sampl_email: editForm.sampl_email || undefined,
        note: editForm.note || undefined,
      },
    },
  });
}
//删除员工-质量数据
export function removeRecording(work_num, id) {
  return service({
    method: "delete",
    url: "user/recording/v1?action=del_info&work_num=" + work_num + "&id=" + id,
    data: {},
  });
}
//新增员工-质量数据（上传excel）
export function submitExcel(data, work_num) {
  return service({
    method: "post",
    url:
      "user/recording/upload/v1?work_unm=" + work_num + "&action=upload_info",
    data: {
      action: "upload_info",
      work_num: work_num,
      newdata: data,
    },
  });
}
//查询项资-需求管理
export function getNeed(work_num, pagenum, pagesize, demands, names) {
  return service({
    method: "get",
    url:
      "mgr/requ?action=list_form&work_num=" +
      work_num +
      "&pagenum=" +
      pagenum +
      "&pagesize=" +
      pagesize +
      "&keywords=" +
      demands +
      "/" +
      names,
    data: {},
  });
}
//查询项资-需求管理-无关键词
export function getNeedNoKey(work_num, pagenum, pagesize) {
  return service({
    method: "get",
    url:
      "mgr/requ?action=list_form&work_num=" +
      work_num +
      "&pagenum=" +
      pagenum +
      "&pagesize=" +
      pagesize,
    data: {},
  });
}
//新增项资-需求管理
export function addNeed(addForm) {
  return service({
    method: "post",
    url: "mgr/requ?action=add_form&work_num=" + addForm.work_num,
    data: {
      action: "add_form",
      data: addForm,
    },
  });
}
//修改项资-需求管理
export function editNeed(editForm) {
  return service({
    method: "put",
    url:
      "mgr/requ?action=modify_form&work_num=" +
      editForm.work_num +
      "&id=" +
      editForm.id,
    data: {
      action: "modify_form",
      id: editForm.id,
      newdata: editForm,
    },
  });
}
//删除项资-需求管理
export function removeNeed(work_num, id) {
  return service({
    method: "delete",
    url: "mgr/requ?action=del_form&work_num=" + work_num + "&id=" + id,
    data: {},
  });
}
//查询项资-项目整体情况
export function getOverall(work_num, pagenum, pagesize, demands, names) {
  return service({
    method: "get",
    url:
      "mgr/schedu?action=list_schedu&work_num=" +
      work_num +
      "&pagenum=" +
      pagenum +
      "&pagesize=" +
      pagesize +
      "&keywords=" +
      demands +
      "/" +
      names,
    data: {},
  });
}
//查询项资-项目整体情况-无关键词
export function getOverallNoKey(work_num, pagenum, pagesize) {
  return service({
    method: "get",
    url:
      "mgr/schedu?action=list_schedu&work_num=" +
      work_num +
      "&pagenum=" +
      pagenum +
      "&pagesize=" +
      pagesize,
    data: {},
  });
}
//查询质控-我的项目
export function getProject(work_num, pagenum, pagesize, demands, names) {
  return service({
    method: "get",
    url:
      "expert/epc?action=list_info&work_num=" +
      work_num +
      "&pagenum=" +
      pagenum +
      "&pagesize=" +
      pagesize +
      "&keywords=" +
      demands +
      "/" +
      names,
    data: {},
  });
}
//查询质控-我的项目-无关键词
export function getProjectNoKey(work_num, pagenum, pagesize) {
  return service({
    method: "get",
    url:
      "expert/epc?action=list_info&work_num=" +
      work_num +
      "&pagenum=" +
      pagenum +
      "&pagesize=" +
      pagesize,
    data: {},
  });
}
//修改项资-我的项目
export function editProject(editForm) {
  return service({
    method: "put",
    url: "expert/epc?work_num=" + editForm.work_num + "&action=modify_info",
    data: {
      action: "modify_info",
      id: editForm.id,
      newdata: {
        project_state: editForm.project_state,
        demand_role: editForm.demand_role,
      },
    },
  });
}
//查询质控-项目整体情况
/* export function getSituation(work_num, pagenum, pagesize, demands, names) {
  return service({
    method: "get",
    url:
      "expert/deta?action=list_form&work_num=" +
      work_num +
      "&pagenum=" +
      pagenum +
      "&pagesize=" +
      pagesize +
      "&keywords=" +
      demands +
      "/" +
      names,
    data: {},
  });
} */

export function getSituation(work_num, pagenum, pagesize, demands, names,states) {
  return service({
    method: "get",
    url:
      "expert/deta?action=list_form&work_num=" +
      work_num +
      "&pagenum=" +
      pagenum +
      "&pagesize=" +
      pagesize +
      "&state=" +
      states +
      "&role="+
      demands+
      "&project_name=" +
      names
  });
} 
//查询质控-项目整体情况-无关键词
export function getSituationNoKey(work_num, pagenum, pagesize) {
  return service({
    method: "get",
    url:
      "expert/deta?action=list_form&work_num=" +
      work_num +
      "&pagenum=" +
      pagenum +
      "&pagesize=" +
      pagesize,
    data: {},
  });
}
//修改项资-项目整体情况
export function editSituation(editForm) {
  return service({
    method: "post",
    url:
      "expert/deta?action=add_form&work_num=" +
      editForm.work_num +
      "&id=" +
      editForm.id,
    data: {
      action: "add_form",
      id: editForm.id,
      project_number: editForm.project_number,
      data: {
        provider: editForm.provider,
        mark_cpd: editForm.mark_cpd,
        quality_cpd: editForm.quality_cpd,
        ac_requ: editForm.ac_requ,
        book_con: editForm.book_con,
        project_con: editForm.project_con,
        accept_model: editForm.accept_model,
        actual_time: editForm.actual_time || undefined,
        deli_note: editForm.deli_note,
        is_submit: editForm.is_submit,
        is_one: editForm.is_one,
        return_num: editForm.return_num,
        work_num: editForm.work_num,
      },
    },
  });
}
//查询质控-组内员工生产明细
export function getEmployees(
  work_num,
  pagenum,
  pagesize,
  name,
  serdate,
  project_name
) {
  return service({
    method: "get",
    url:
      "expert/work?action=list_form&work_num=" +
      work_num +
      "&pagenum=" +
      pagenum +
      "&pagesize=" +
      pagesize +
      "&name=" +
      name +
      "&serdate=" +
      serdate +
      "&project_name=" +
      project_name,
    data: {},
  });
}

//查询质控-组内员工质量数据
export function getRecordings(work_num, pagenum, pagesize, names, packets) {
  return service({
    method: "get",
    url:
      "expert/recording/v1?action=list_form&work_num=" +
      work_num +
      "&pagenum=" +
      pagenum +
      "&pagesize=" +
      pagesize +
      "&keywords=" +
      names +
      "/" +
      packets,
    data: {},
  });
}
//查询质控-组内员工质量数据-无关键词
export function getRecordingsNoKey(work_num, pagenum, pagesize) {
  return service({
    method: "get",
    url:
      "expert/recording/v1?action=list_form&work_num=" +
      work_num +
      "&pagenum=" +
      pagenum +
      "&pagesize=" +
      pagesize,
    data: {},
  });
}
//修改质控-组内员工质量数据
export function editRecordings(editForm) {
  return service({
    method: "put",
    url:
      "expert/recording/v1?action=modify_info&work_num=" +
      editForm.work_num +
      "&id=" +
      editForm.id,
    data: {
      action: "modify_form",
      id: editForm.id,
      newdata: {
        project_id: editForm.project_id || undefined,
        project_name: editForm.project_name || undefined,
        packet_id: editForm.packet_id || undefined,
        subtask_id: editForm.subtask_id || undefined,
        accept_time: editForm.accept_time || undefined,
        supplier: editForm.supplier || undefined,
        return_times: editForm.return_times || undefined,
        type_job: editForm.type_job || undefined,
        besampl_email: editForm.besampl_email || undefined,
        besampl_man: editForm.besampl_man || undefined,
        besampl_num: editForm.besampl_num || undefined,
        besamp_err: editForm.besamp_err || undefined,
        appeal_num: editForm.appeal_num || undefined,
        appeal_pass: editForm.appeal_pass || undefined,
        sampl_email: editForm.sampl_email || undefined,
        note: editForm.note || undefined,
      },
    },
  });
}
//查询质控-数据包交付记录
export function getDeliveryNoKey(pid, work_num, pagenum, pagesize) {
  return service({
    method: "get",
    url:
      "expert/delivery/v1?project_id=" +
      pid +
      "&action=list_info&work_num=" +
      work_num +
      "&pagenum=" +
      pagenum +
      "&pagesize=" +
      pagesize,
    data: {},
  });
}
export function getDelivery(pid, work_num, pagenum, pagesize, ids) {
  return service({
    method: "get",
    url:
      "expert/delivery/v1?project_id=" +
      pid +
      "&action=list_info&work_num=" +
      work_num +
      "&pagenum=" +
      pagenum +
      "&pagesize=" +
      pagesize +
      "&pack=" +
      ids,
    data: {},
  });
}
//新增质控-数据包交付记录
/* export function addDelivery(pid,addForm,alg){
    return service({
        method:'post',
        url:'/expert/delivery/v1?project_id='+pid+
        '&action=add_info&work_num='+addForm.work_num+"&ALG="+alg,
        data:{
            "action":"add_info",
            "work_num":addForm.work_num,
            "newdata":{
                "project_id":pid,
		"packet_id":addForm.packet_id,
       "subtask_id":addForm.subtask_id,
                "progress_status":addForm.progress_status,
		"packet_num":addForm.packet_num,
		"plan_time":addForm.plan_time,
		"mark_time":addForm.mark_time||undefined,
		"final_accuray":addForm.final_accuray||undefined,
		"supplier":addForm.supplier||undefined,
		"mark_platform":addForm.mark_platform||undefined,
		"priority_level":addForm.priority_level||undefined,
		"quality_person":addForm.quality_person||undefined,
		"serial_number":addForm.serial_number||undefined,
		"note":addForm.note||undefined,
		"work_num":addForm.work_num
            }
        }
    })
} */
//修改质控-数据包交付记录
export function editDelivery(pid, editForm) {
  return service({
    method: "post",
    url:
      "expert/delivery/v1?project_id=" +
      pid +
      "&action=add_info&work_num=" +
      editForm.work_num,
    data: {
      action: "add_info",
      id: editForm.id,
      newdata: {
        project_id: pid,
        packet_id: editForm.packet_id,
        subtask_id: editForm.subtask_id,
        progress_status: editForm.progress_status,
        packet_num: editForm.packet_num,
        uprice: editForm.uprice,
        setmonth: editForm.setmonth,
        plan_time: editForm.plan_time ,
        mark_time: editForm.mark_time ,
        final_accuray: editForm.final_accuray ,
        mark_platform: editForm.mark_platform ,
        priority_level: editForm.priority_level ,
        quality_person: editForm.quality_person ,
        serial_number: editForm.serial_number ,
        note: editForm.note ,
        work_num: editForm.work_num ,
      },
    },
  });
}
//删除质控-数据包交付记录
export function removeDelivery(pid, work_num, id) {
  return service({
    method: "delete",
    url:
      "expert/delivery/v1?project_id=" +
      pid +
      "&action=del_info&work_num=" +
      work_num +
      "&id=" +
      id,
    data: {},
  });
}
//获取所有项目名称
export function getAllProjectName() {
  return service({
    method: "get",
    url: "http://localhost:5222/PnameList",
    data: {},
  });
}
//提报流程审批
export function addApproval(addFrom) {
  return service({
    method: "post",
    url: "user/oaprocess/v1?action=add_info&work_num=" + addFrom.proposer_num,
    data: {
      action: "add_info",
      work_num: addFrom.proposer_num,
      data_list: addFrom,
    },
  });
}
//获取所有审批
export function getApproval(work_num, pagenum, pagesize, state) {
  return service({
    method: "get",
    url:
      "user/oaprocess/v1?action=list_info&work_num=" +
      work_num +
      "&pagenum=" +
      pagenum +
      "&pagesize=" +
      pagesize +
      "&state=" +
      state,
    /*     url: "http://localhost:5222/ApprovalList", */
    data: {},
  });
}
//修改审批
export function editApproval(order_id, editForm) {
  return service({
    method: "put",
    url:
      "user/oaprocess/v1?action=modify_info&work_num=" +
      editForm.proposer_num +
      "&order_id=" +
      order_id,
    data: {
      action: "modify_info",
      order_id: order_id,
      work_num: editForm.proposer_num,
      data_list: editForm,
    },
  });
}
//撤回审批
export function recallApproval(work_num, id) {
  return service({
    method: "delete",
    url:
      "/user/oaprocess/v1?action=del_info&work_num=" +
      work_num +
      "&order_id=" +
      id,
    data: {},
  });
}

//获取员工产出汇总
export function getAllProduce(work_num, pagenum, pagesize, state, name,wdate) {
  return service({
    method: "get",
    url:
      "user/employee/sum/v1?action=list_info&work_num=" +
      work_num +
      "&pagenum=" +
      pagenum +
      "&pagesize=" +
      pagesize +
      "&state2=" +
      state +
      "&keywords=" +
      name ,
    /*     url: "http://localhost:5222/ApprovalList", */
    data: {},
  });
}
////获取员工产出汇总-其他状态
export function getAllProduceState(work_num, pagenum, pagesize, state) {
  return service({
    method: "get",
    url:
      "user/employee/sum/v1?action=list_info&work_num=" +
      work_num +
      "&pagenum=" +
      pagenum +
      "&pagesize=" +
      pagesize +
      "&state2=" +
      state,

    data: {},
  });
}
//获取员工明细表单
export function getDetail(work_num, id) {
  return service({
    method: "get",
    url:
      "user/employee/detail/v2?action=list_info&work_num=" +
      work_num +
      "&id=" +
      id,
    /*     url:"http://localhost:5222/DetailList", */
    data: {},
  });
}
//修改员工明细表单
export function editDetail(editFrom) {
  return service({
    method: "put",
    url:
      "user/employee/detail/v2?action=modify_info&work_num=" +
      editFrom.work_num +
      "&id=" +
      editFrom.id +
      "&order_id=" +
      editFrom.order_id,
    data: {
      action: "modify_info",
      id: editFrom.id,
      order_id: editFrom.order_id,
      data_work: {
        data_time: editFrom.data_time,
        project_name: editFrom.project_name,
        project_role: editFrom.project_role,
        work_overtime: editFrom.work_overtime,
        account: editFrom.account,
        mark_time: editFrom.mark_time,
        mark_number: editFrom.mark_number,
        quality_time: editFrom.quality_time,
        quality_number: editFrom.quality_number,
        test_mark_time: editFrom.test_mark_time,
        traing_time: editFrom.traing_time,
        question_time: editFrom.question_time,
        data_process_time: editFrom.data_process_time,
        analyse_time: editFrom.analyse_time,
        other_time: editFrom.other_time,
        loss_time: editFrom.loss_time,
        note: editFrom.note,
        over_mark_time: editFrom.over_mark_time,
        over_mark_number: editFrom.over_mark_number,
        over_quality_time: editFrom.over_quality_time,
        over_quality_number: editFrom.over_quality_number,
        over_test_mark_time: editFrom.over_test_mark_time,
        over_traing_time: editFrom.over_traing_time,
        over_question_time: editFrom.over_question_time,
        over_data_process_time: editFrom.over_data_process_time,
        over_analyse_time: editFrom.over_analyse_time,
        over_other_time: editFrom.over_other_time,
        over_loss_time: editFrom.over_loss_time,
        over_note: editFrom.over_note,
      },
      workorder: {
        category: "work",
        state1: 2,
        cause1: "",
        appro_date1: "",
        state2: 2,
        cause2: "",
        appro_date2: "",
        proposer_num: editFrom.work_num,
      },
    },
  });
}
//撤回员工明细表单
export function recallDetail(work_num, id, order_id) {
  return service({
    method: "delete",
    url:
      "user/employee/detail/v2?action=del_info&work_num=" +
      work_num +
      "&id=" +
      id +
      "&order_id=" +
      order_id,
    data: {},
  });
}
//新增员工明细表单
export function addProduce(addForm) {
  return service({
    method: "post",
    url: "user/employee/detail/v2?action=add_info&work_num=" + addForm.work_num,
    data: {
      action: "add_info",
      project_name: "queryNER标注-221115-03",
      data_work: {
        work_num: addForm.work_num,
        data_time: addForm.data_time,
        project_name: addForm.project_name,
        project_role: addForm.project_role,
        work_overtime: addForm.work_overtime,
        account: addForm.account,
        mark_time: addForm.mark_time,
        mark_number: addForm.mark_number,
        quality_time: addForm.quality_time,
        quality_number: addForm.quality_number,
        test_mark_time: addForm.test_mark_time,
        traing_time: addForm.traing_time,
        question_time: addForm.question_time,
        data_process_time: addForm.data_process_time,
        analyse_time: addForm.analyse_time,
        other_time: addForm.other_time,
        loss_time: addForm.loss_time,
        note: addForm.note,
        over_mark_time: addForm.over_mark_time,
        over_mark_number: addForm.over_mark_number,
        over_quality_time: addForm.over_quality_time,
        over_quality_number: addForm.over_quality_number,
        over_test_mark_time: addForm.over_test_mark_time,
        over_traing_time: addForm.over_traing_time,
        over_question_time: addForm.over_question_time,
        over_data_process_time: addForm.over_data_process_time,
        over_analyse_time: addForm.over_analyse_time,
        over_other_time: addForm.over_other_time,
        over_loss_time: addForm.over_loss_time,
        over_note: addForm.over_note,
      },
      workorder: {
        category: "work",
        state1: 2,
        state2: 2,
        proposer_num: addForm.work_num,
      },
    },
  });
}
//获取组内员工生产汇总
export function getAllProduces(work_num, pagenum, pagesize, state, name,wdate) {
  return service({
    method: "get",
    url:
      "expert/work/sum/v2?action=list_form&work_num=" +
      work_num +
      "&pagesize=" +
      pagesize +
      "&pagenum=" +
      pagenum +
      "&state=" +
      state +
      "&first_name=" +
      name +
      "&wdate=" +
      wdate,
    /*   url: "http://localhost:5222/allProducesList", */
    data: {},
  });
}

//获取组内员工生产汇总（无日期）
export function getAllProducesNoDate(work_num, pagenum, pagesize, state, name) {
  return service({
    method: "get",
    url:
      "expert/work/sum/v2?action=list_form&work_num=" +
      work_num +
      "&pagesize=" +
      pagesize +
      "&pagenum=" +
      pagenum +
      "&state=" +
      state +
      "&first_name=" +
      name,
    /*   url: "http://localhost:5222/allProducesList", */
    data: {},
  });
}
//获取组内员工明细表单
export function getDetailE(work_num, id) {
  return service({
    method: "get",
    url:
      "expert/work/detail/v2?action=list_form&work_num=" +
      work_num +
      "&order_id=" +
      id,
    /*     url:"http://localhost:5222/DetailList", */
    data: {},
  });
}
//质控专家通过员工生产审批-单条
export function allowQDetailE(work_num, order_id, time) {
  return service({
    method: "put",
    url:
      "expert/work/sum/v2?action=modify_form&work_num=" +
      work_num +
      "&order_id=" +
      order_id,
    data: {
      action: "modify_form",
      order_id: order_id,
      work_num: work_num,
      data_list: {
        approver1: work_num,
        state1: 0,
        appro_date1: time,
      },
    },
  });
}
//质控专家驳回员工生产审批-单条
export function disallowQDetailE(work_num, order_id, time, cause1) {
  return service({
    method: "put",
    url:
      "expert/work/sum/v2?action=modify_form&work_num=" +
      work_num +
      "&order_id=" +
      order_id,
    data: {
      action: "modify_form",
      order_id: order_id,
      work_num: work_num,
      data_list: {
        approver1: work_num,
        state1: 1,
        cause1: cause1,
        appro_date1: time,
      },
    },
  });
}
//项目经理通过员工生产审批-单条
export function allowMDetailE(work_num, order_id, time) {
  return service({
    method: "post",
    url:
      "expert/work/sum/v2?action=modify_form&work_num=" +
      work_num +
      "&order_id=" +
      order_id,
    data: {
      action: "modify_form",
      order_id: order_id,
      work_num: work_num,
      data_list: {
        approver1: work_num,
        state2: 0,
        appro_date1: time,
      },
    },
  });
}
//项目经理驳回员工生产审批-单条
export function disalloMDetailE(work_num, order_id, time, cause2) {
  return service({
    method: "post",
    url:
      "expert/work/sum/v2?action=modify_form&work_num=" +
      work_num +
      "&order_id=" +
      order_id,
    data: {
      action: "modify_form",
      order_id: order_id,
      work_num: work_num,
      data_list: {
        approver1: work_num,
        state2: 1,
        cause2: cause2,
        appro_date1: time,
      },
    },
  });
}
//质控专家同意员工生产审批-批量
export function allowQDetailEAll(work_num, allList, total) {
  return service({
    method: "put",
    url: "expert/work/sum/batch/v2?action=modify_form&work_num=" + work_num,
    data: {
      action: "modify_form",
      work_num: work_num,
      data_list: allList,
      total: total,
    },
  });
}
//项目经理同意员工生产审批-批量
export function allowMDetailEAll(work_num, allList, total) {
  return service({
    method: "put",
    url: "expert/work/sum/batch/v2?action=modify_form&work_num=" + work_num,
    data: {
      action: "modify_form",
      work_num: work_num,
      data_list: allList,
      total: total,
    },
  });
}
//项目经理获取组内员工所有审批
export function getApproves(work_num, pagenum, pagesize, state) {
  return service({
    method: "get",
    url:
      "expert/process/v1?action=list_form&work_num=" +
      work_num +
      "&pagenum=" +
      pagenum +
      "&pagesize=" +
      pagesize +
      "&state=" +
      state,
    /*     url: "http://localhost:5222/allApprovesList", */
    data: {},
  });
}
//项目经理处理组内员工审批
export function editApproves(work_num, order_id, editForm) {
  return service({
    method: "put",
    url:
      "expert/process/v1?action=modify_form&work_num=" +
      work_num +
      "&order_id=" +
      order_id,
    data: {
      action: "modify_form",
      order_id: order_id,
      work_num: work_num,
      data_list: editForm,
    },
  });
}
//项资列出oa表单
export function getApprovesO(work_num, pagenum, pagesize, state, category) {
  return service({
    method: "get",
    url:
      "mgr/oaprocess/v1?action=list_info&work_num=" +
      work_num +
      "&pagenum=" +
      pagenum +
      "&pagesize=" +
      pagesize +
      "&state=" +
      state +
      "&category=" +
      category,
    /*     url: "http://localhost:5222/allApprovesOList", */
    data: {},
  });
}

//项资处理OA表单
export function editApprovesO(work_num, order_id, editForm) {
  return service({
    method: "put",
    url:
      "mgr/oaprocess/v1?action=modify_info&work_num=" +
      work_num +
      "&order_id=" +
      order_id,
    data: {
      action: "modify_info",
      order_id: order_id,
      work_num: "220711001",
      data_list: editForm,
    },
  });
}

//项资获取项目明细总览
export function getAllSituationO(work_num, pagesize, pagenum, keywords) {
  return service({
    method: "get",
    url:
      "mgr/global/v1?table=procare&action=list_info&work_num=" +
      work_num +
      "&pagesize=" +
      pagesize +
      "&pagenum=" +
      pagenum +
      "&keywords=" +
      keywords,
    /*     url: "http://localhost:5222/getAllSituationOList", */
    data: {},
  });
}
//项资获取员工产出总览
export function getAllProdeceO(work_num, pagesize, pagenum, keywords) {
  return service({
    method: "get",
    url:
      "mgr/global/v1?table=employee&action=sum_list_info&work_num=" +
      work_num +
      "&pagesize=" +
      pagesize +
      "&pagenum=" +
      pagenum +
      "&keywords=" +
      keywords,
    /*    url: "http://localhost:5222/getAllEmployeeOList", */
    data: {},
  });
}
//项资获取员工产出明细
export function getDetailO(work_num, id) {
  return service({
    method: "get",
    url:
      "mgr/global/v1?table=employee&action=detail_list_info&work_num=" +
      work_num +
      "&id=" +
      id,
    /*     url: "http://localhost:5222/getAllDetailOList", */
    data: {},
  });
}
//项资获取质量数据总览
export function getRecordingO(work_num, pagenum, pagesize, keywords) {
  return service({
    method: "get",
    url:
      "mgr/global/v1?table=recording&action=list_info&work_num=" +
      work_num +
      "&pagenum=" +
      pagenum +
      "&pagesize=" +
      pagesize +
      "&keywords=" +
      keywords,
    /*     url: "http://localhost:5222/getAllRecordingOList", */
    data: {},
  });
}
//项资获取质量数据总览
export function getDeliveryO(work_num, pagenum, pagesize, keywords) {
  return service({
    method: "get",
    url:
      "mgr/global/v1?table=delivery&action=list_info&work_num=" +
      work_num +
      "&pagesize=" +
      pagenum +
      "&pagenum=" +
      pagesize +
      "&keywords=" +
      keywords,
    /*  url: "http://localhost:5222/getAllDeliveryOList", */
    data: {},
  });
}
//echarts测试数据
export function getEcharts(){
  return service({
    method:"get",
    url:"http://localhost:5222/echartDemo",
    data:{}
  })
}
