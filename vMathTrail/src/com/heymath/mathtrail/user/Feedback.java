package com.heymath.mathtrail.user;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;

import org.apache.struts2.interceptor.ParameterAware;

import com.heymath.mathtrail.utils.DBConnection;
import com.opensymphony.xwork2.ActionSupport;

public class Feedback extends ActionSupport implements ParameterAware {

	private String userId;
	private String trailKey;
	private String trailRating;
	private String userComments;
	private String institute;
	private String parentMailId;
	private String userRole;
	private String sourceOfInfo;
	/* private String goldScore;
	private String silverScore;
	private String copperScore;
	private String questionAttempted;
	private String helperFlag;
	private String trailComplete; */
		
	private Map parameters;
	
	public Map getParameters() {
        return parameters;
    }
	
	public void setParameters(Map param) {
        this.parameters = param;
    }
	
	public String loadFeedback()
	{
		
		Connection conn = DBConnection.getDBConnection();
		
		ResultSet rs = null;
		
		System.out.println("The user id in loadFeedback is : "+ userId);
		  
	    System.out.println("The trailKey in loadFeedback is : "+ trailKey);
		
		try{
			PreparedStatement ps = conn.prepareStatement("Select a.TrailRating,a.UserComments,a.SourceOfInfo,b.Institute,b.ParentMailId,b.UserRole from MathTrail_UserFeedback a,MathTrail_Users b where a.UserId = ? and a.TrailKey = ? and a.UserId = b.User_id");
			
			// ps.setInt(1,0);
			ps.setString(1,userId);
			ps.setString(2,trailKey);
									
			ps.executeQuery();
			
			rs = ps.executeQuery();
			
			 while (rs.next()) {
				  trailRating = rs.getString(1);
				  System.out.println("The trailRating is : "+ trailRating);
				  
				  userComments = rs.getString(2);
				  System.out.println("The userComments is : "+ userComments);
				  
				  sourceOfInfo = rs.getString(3);
				  System.out.println("The sourceOfInfo is : "+ sourceOfInfo);
				  
				  institute = rs.getString(4);
				  System.out.println("The institute is : "+ institute);
				  
				  parentMailId = rs.getString(5);
				  System.out.println("The parentMailId is : "+ parentMailId);
				  
				  userRole = rs.getString(6);
				  System.out.println("The userRole is : "+ userRole);				  
			}
			
			// conn.close();
			 
		}catch(SQLException ex){
			ex.printStackTrace();
		}catch(Exception ex)
		{
			ex.printStackTrace();
		}finally{
			try{
				 if( conn != null ) {
					rs.close();
					conn.close();
				 }
			}catch(Exception ex){
				ex.printStackTrace();
			}
		}		
		
		return SUCCESS;		
	}
	
	public String submitFeedback()
	{
			
		Connection conn = DBConnection.getDBConnection();
		PreparedStatement ps;
		
		System.out.println("The user id in submitFeedback is : "+ userId);
		  
	    System.out.println("The trailKey in submitFeedback is : "+ trailKey);
		
		 try{
			 
			 if(countUserFeedback() > 0)
			 {
				 ps = conn.prepareStatement("UPDATE MathTrail_UserFeedback set TrailRating = ?,UserComments = ?,SourceOfInfo = ? where UserId = ? and TrailKey = ?");
			 }else{
				 ps = conn.prepareStatement("INSERT into MathTrail_UserFeedback (TrailRating,UserComments,SourceOfInfo,UserId,TrailKey) Values(?,?,?,?,?)");
			 }
			 				
				// ps.setInt(1,0);
				
				ps.setString(1,trailRating);
				ps.setString(2,userComments);
				ps.setString(3,sourceOfInfo);
				ps.setString(4,userId);
				ps.setString(5,trailKey);
									
				ps.executeUpdate();
				
				ps = conn.prepareStatement("UPDATE MathTrail_Users set Institute = ?,ParentMailId = ?,UserRole = ?  where User_id = ?");
				
				ps.setString(1,institute);
				ps.setString(2,parentMailId);
				ps.setString(3,userRole);
				ps.setString(4,userId);
									
				ps.executeUpdate();
				
				// conn.close();
				 
			}catch(SQLException ex){
				ex.printStackTrace();
			}catch(Exception ex)
			{
				ex.printStackTrace();
			} finally{
				try{
					 if( conn != null ) {
						 conn.close();
					 }
				}catch(Exception ex){
					ex.printStackTrace();
				}
			}
		
		
		return SUCCESS;
		
	}
	
	public int countUserFeedback(){
		
		Connection conn = DBConnection.getDBConnection();
		PreparedStatement ps;
		ResultSet rs = null;
		int count = 0;
	
		try{
			ps = conn.prepareStatement("Select count(*) from MathTrail_UserFeedback where UserId = ? and TrailKey = ?");
			
			// ps.setInt(1,0);
			ps.setString(1,userId);
			ps.setString(2,trailKey);
									
			ps.executeQuery();
			
			rs = ps.executeQuery();
			
			 while (rs.next()) {
				  count = rs.getInt(1);
				  System.out.println("The number of entries retrieved is : "+ count);
			}
		
			// conn.close();
			 
		}catch(SQLException ex){
			ex.printStackTrace();
		}catch(Exception ex)
		{
			ex.printStackTrace();
		}finally{
			try{
				 if( conn != null ) {
					 conn.close();
				 }
			}catch(Exception ex){
				ex.printStackTrace();
			}
		}
		
		return count;
	}
	
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	public void setTrailKey(String trailKey) {
		this.trailKey = trailKey;
	}

	public String getTrailKey() {
		return trailKey;
	}

	public String getTrailRating() {
		return trailRating;
	}

	public void setTrailRating(String trailRating) {
		this.trailRating = trailRating;
	}

	public String getUserComments() {
		return userComments;
	}

	public void setUserComments(String userComments) {
		this.userComments = userComments;
	}

	public String getInstitute() {
		return institute;
	}

	public void setInstitute(String institute) {
		this.institute = institute;
	}

	public String getParentMailId() {
		return parentMailId;
	}

	public void setParentMailId(String parentMailId) {
		this.parentMailId = parentMailId;
	}

	public String getUserRole() {
		return userRole;
	}

	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}

	public String getSourceOfInfo() {
		return sourceOfInfo;
	}

	public void setSourceOfInfo(String sourceOfInfo) {
		this.sourceOfInfo = sourceOfInfo;
	}
	
}
