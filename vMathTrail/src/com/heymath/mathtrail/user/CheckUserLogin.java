package com.heymath.mathtrail.user;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.heymath.mathtrail.utils.DBConnection;
import com.opensymphony.xwork2.ActionSupport;

public class CheckUserLogin extends ActionSupport {

	private String email;
	private String userCount = "0";
	
	// private JSONObject oUserCount = new JSONObject();
	
	public String checkUser(){
		
		Connection conn = DBConnection.getDBConnection();
		
		ResultSet rs = null;
		PreparedStatement ps = null;
		
		System.out.println("The email received in checkUser is " + email);
			
		try{
			ps = conn.prepareStatement("Select count(*) from MathTrail_Users where LOWER(Email_id) = LOWER(?)");
			
			// ps.setInt(1,0);
			ps.setString(1,email.trim().toLowerCase());
									
			ps.executeQuery();
			
			rs = ps.executeQuery();
			
			 while (rs.next()) {
				  userCount = String.valueOf(rs.getInt(1));
				  System.out.println("The number of users retrieved in checkUser is : "+ userCount);
			}
			 
			// conn.close();
			 
		}catch(SQLException ex){
			ex.printStackTrace();
		}catch(Exception ex){
			ex.printStackTrace();
		}finally{
			try{
				System.out.println("Now closing the connection checkUser " + conn.getClientInfo());
				if(ps != null ){
					 ps.close();
				 }
				 
				 if(rs != null){
					 rs.close();
				 }
				 if( conn != null ) {
					  conn.close();
				 }
				System.out.println("Connection object is: " + conn);
			}catch(Exception ex){
				ex.printStackTrace();
			}
		}
				
		// oUserCount.put("userCount", userCount);
		
		return SUCCESS;
				
	}
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getUserCount() {
		return userCount;
	}

	public void setUserCount(String userCount) {
		this.userCount = userCount;
	}
		
	/* public JSONObject getoUserCount() {
		return oUserCount;
	}

	public void setoUserCount(JSONObject oUserCount) {
		this.oUserCount = oUserCount;
	} */
	
}
