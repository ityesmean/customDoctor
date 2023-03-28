// package com.roller.doc.api.response.user;
//
// import java.util.List;
//
// import com.roller.doc.db.entity.DrugMy;
// import com.roller.doc.db.entity.Role;
// import com.roller.doc.db.entity.User;
//
// import lombok.Getter;
// import lombok.Setter;
//
// @Getter
// @Setter
// public class UserRes {
// 	private List<?> contents;
// 	private Long user_id;
// 	private Boolean user_deleted;
// 	private String user_email;
// 	private String user_name;
// 	private Role user_role;
//
// 	public List<?> getContents() {
// 		return contents;
// 	}
//
// 	public void setContents(List<?> contents) {
// 		this.contents = contents;
// 	}
//
//
// 	public UserRes() {
//
// 	}
//
// 	public UserRes(User user) {
// 		this.user_id = user.getUser_id();
// 		this.user_deleted = user.getUser_deleted();
// 		this.user_email = user.getUser_email();
// 		this.user_name = user.getUser_name();
// 		this.user_role = user.getUser_role();
// 	}
//
// 	public UserRes(DrugMy drugMy) {
// 		User user = drugMy.getUser();
// 		this.user_id = user.getUser_id();
// 		this.user_deleted = user.getUser_deleted();
// 		this.user_email = user.getUser_email();
// 		this.user_name = user.getUser_name();
// 		this.user_role = user.getUser_role();
// 	}
// }
