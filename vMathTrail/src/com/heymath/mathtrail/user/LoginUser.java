package com.heymath.mathtrail.user;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;

import com.heymath.mathtrail.utils.DBConnection;
import com.heymath.mathtrail.utils.GetAllTrailDetails;
import com.heymath.mathtrail.vo.TrailConfigDataVO;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import org.apache.struts2.ServletActionContext;

public class LoginUser extends ActionSupport {

	private String email;
	private String name;
	private String userId;
	private String country;
	private int userCount = 0;
	private ArrayList<TrailConfigDataVO> allTrailDetails;
				
	public String createUser()
	{
		System.out.println("Email-id of the user : " + email);
		System.out.println("Name of the user : " + name);
		System.out.println("Country of the user : " + country);
				
		if( ( email == null || email.trim().equals("") ) )
		{
			return ERROR;		
		}
		
		Connection conn = DBConnection.getDBConnection();
		PreparedStatement ps = null;
		
		ResultSet rs = null;
		
		countUser();
		
		try{
			
				if( userCount == 0 ){
				
				ps = conn.prepareStatement("INSERT into MathTrail_Users (Email_id,First_name,Country) Values(?,?,?)",Statement.RETURN_GENERATED_KEYS);
				
				// ps.setInt(1,0);
				ps.setString(1,email.trim().toLowerCase());
				ps.setString(2,name.trim());
				ps.setString(3,country.trim());
		
				int checkInsert = ps.executeUpdate();
				
	            rs = ps.getGeneratedKeys();
	            
	            if (rs != null && rs.next() && checkInsert == 1) {
	            	userId = rs.getString(1);
	            	System.out.println("The generated id value is : "+ rs.getString(1));				
	            }
	            
	            ActionContext.getContext().getSession().put("userEmail", email);
	            ActionContext.getContext().getSession().put("userName", name);
						 
			}else{
				
				ps = conn.prepareStatement("Select User_id from MathTrail_Users where Email_id = ?");
				
				// ps.setInt(1,0);
				ps.setString(1,email.trim().toLowerCase());
														
				ps.executeQuery();
				
				rs = ps.executeQuery();
				
				 while (rs.next()) {
					  userId = rs.getString(1);
					  System.out.println("The user-id retrieved for the e-mail is : "+ userId);
				}				
				
			}
				
				setAllTrailDetails(GetAllTrailDetails.getAllTrailDetails());
				
				ActionContext.getContext().getSession().put("userId", userId);
				
				// conn.close();
				 
		}catch(SQLException ex){
			ex.printStackTrace();
		}catch(Exception ex)
		{
			ex.printStackTrace();
		}finally{
			try{
				 System.out.println("Now closing the connection createUser " + conn.getClientInfo());
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
		
		return SUCCESS;
		
	}
	
	public void countUser(){
		ResultSet rs = null;
		
		Connection conn = DBConnection.getDBConnection();
		PreparedStatement ps = null;
			
		try{
			ps = conn.prepareStatement("Select count(*) from MathTrail_Users where LOWER(Email_id) = LOWER(?)");
			
			// ps.setInt(1,0);
			ps.setString(1,email.trim().toLowerCase());
									
			ps.executeQuery();
			
			rs = ps.executeQuery();
			
			 while (rs.next()) {
				  userCount = rs.getInt(1);
				  System.out.println("The number of users retrieved is : "+ userCount);
			}
			 			 
		// conn.close();
			 
		}catch(SQLException ex){
			ex.printStackTrace();
		}catch(Exception ex)
		{
			ex.printStackTrace();
		}finally{
			try{
				System.out.println("Now closing the connection countUser " + conn.getClientInfo());
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
		
		
	}
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public void setAllTrailDetails(ArrayList<TrailConfigDataVO> allTrailDetails) {
		this.allTrailDetails = allTrailDetails;
	}

	public ArrayList<TrailConfigDataVO> getAllTrailDetails() {
		return allTrailDetails;
	}
	
}
