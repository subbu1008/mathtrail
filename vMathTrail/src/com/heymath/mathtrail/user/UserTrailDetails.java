package com.heymath.mathtrail.user;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.heymath.mathtrail.utils.DBConnection;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import org.apache.struts2.ServletActionContext;

public class UserTrailDetails extends ActionSupport {

	private String userId;
	private String trailKey;
	private String locIndex = "0";
	private String country;
	
	private String questionAttempted;
	private String helperFlag;
	private String goldScore = "0";
	private String silverScore = "0";
	private String copperScore = "0";
	private String trailComplete = "N";
			
	public String getUserTrailDetails()
	{
		System.out.println("User id of the user : " + userId);
		System.out.println("Trail key is : " + trailKey);
						
		if( ( userId == null || userId.trim().equals("") ) )
		{
			return ERROR;		
		}
		
		Connection conn = DBConnection.getDBConnection();
		PreparedStatement ps = null;
		
		ResultSet rs = null;
		
		try{
			
							
				ps = conn.prepareStatement("Select b.User_id,b.Loc_Index,b.Question_Attempted,b.Helper_Flag,b.Gold_Score,b.Silver_Score,b.Copper_Score,b.Trail_Complete from MathTrail_UserTrail b where b.User_Id = ? and b.Trail_Key = ?");
				
				// ps.setInt(1,0);
				ps.setString(1,userId.trim().toLowerCase());
				ps.setString(2,trailKey);
														
				ps.executeQuery();
				
				rs = ps.executeQuery();
				
				 while (rs.next()) {
					  userId = rs.getString(1);
					  System.out.println("The user-id retrieved for the e-mail is : "+ userId);
					  
					  locIndex = String.valueOf(rs.getInt(2));
					  System.out.println("The locIndex retrieved for the e-mail is : "+ locIndex);
					  
					  questionAttempted = rs.getString(3);
					  System.out.println("The questionAttempted retrieved for the e-mail is : "+ questionAttempted);
					  
					  helperFlag = rs.getString(4);
					  System.out.println("The helperFlag retrieved for the e-mail is : "+ helperFlag);
					  
					  goldScore = String.valueOf(rs.getInt(5));
					  System.out.println("The goldScore retrieved for the e-mail is : "+ goldScore);
					  
					  silverScore = String.valueOf(rs.getInt(6));
					  System.out.println("The silverScore retrieved for the e-mail is : "+ silverScore);
					  
					  copperScore = String.valueOf(rs.getInt(7));
					  System.out.println("The copperScore retrieved for the e-mail is : "+ copperScore);
					  
					  trailComplete = rs.getString(8);
					  System.out.println("The trailComplete retrieved for the e-mail is : "+ trailComplete);
				}				
				
				
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
	
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getTrailKey() {
		return trailKey;
	}

	public void setTrailKey(String trailKey) {
		this.trailKey = trailKey;
	}

	public String getLocIndex() {
		return locIndex;
	}

	public void setLocIndex(String locIndex) {
		this.locIndex = locIndex;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getQuestionAttempted() {
		return questionAttempted;
	}

	public void setQuestionAttempted(String questionAttempted) {
		this.questionAttempted = questionAttempted;
	}

	public String getGoldScore() {
		return goldScore;
	}

	public void setGoldScore(String goldScore) {
		this.goldScore = goldScore;
	}

	public String getSilverScore() {
		return silverScore;
	}

	public void setSilverScore(String silverScore) {
		this.silverScore = silverScore;
	}

	public String getCopperScore() {
		return copperScore;
	}

	public void setCopperScore(String copperScore) {
		this.copperScore = copperScore;
	}

	public String getHelperFlag() {
		return helperFlag;
	}

	public void setHelperFlag(String helperFlag) {
		this.helperFlag = helperFlag;
	}

	public void setTrailComplete(String trailComplete) {
		this.trailComplete = trailComplete;
	}

	public String getTrailComplete() {
		return trailComplete;
	}
	
}
