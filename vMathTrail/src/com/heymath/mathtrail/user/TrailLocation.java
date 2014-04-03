package com.heymath.mathtrail.user;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;

import org.apache.struts2.interceptor.ParameterAware;

import com.heymath.mathtrail.utils.DBConnection;
import com.heymath.mathtrail.utils.GetAllTrailDetails;
import com.opensymphony.xwork2.ActionSupport;

public class TrailLocation extends ActionSupport implements ParameterAware {

	private String userId;
	private String trailKey;
	private String locIndex;
	private String goldScore;
	private String silverScore;
	private String copperScore;
	private String questionAttempted;
	private String helperFlag;
	private String trailComplete;
		
	private Map parameters;
	
	public Map getParameters() {
        return parameters;
    }
	
	public void setParameters(Map param) {
        this.parameters = param;
    }
	
	public String updateLoc()
	{
		
		Connection conn = DBConnection.getDBConnection();
		PreparedStatement ps;
		
		 Map map = getParameters();
		
		  String[] tmp = (String[])map.get("userId");
		  
		  System.out.println("The userId is " + tmp[0]);
		  
		  userId = tmp[0];
		  
		  String[] tmp1 = (String[])map.get("trailKey");
		  
		  System.out.println("The trailKey is " + tmp1[0]);		
		  
		  trailKey = tmp1[0];
		 
		  String[] tmp2 = (String[])map.get("locIndex");
		  
		  System.out.println("The locIndex is " + tmp2[0]);		
		  
		  locIndex = tmp2[0];    
		  
		  String[] tmp3 = (String[])map.get("questionAttempted");
		  
		  System.out.println("The questionAttempted is " + tmp3[0]);		
		  
		  questionAttempted = tmp3[0];    
		  
		  String[] tmp4 = (String[])map.get("helperFlag");
		  
		  System.out.println("The helperFlag is " + tmp4[0]);		
		  
		  helperFlag = tmp4[0]; 
		
		 try{
			 
			if( countUserTrailLoc() > 0 ) {
			 
				ps = conn.prepareStatement("Update MathTrail_UserTrail set Loc_Index = ?,Question_Attempted = ?,Helper_Flag = ?,End_Time = NOW() where User_Id = ? and Trail_Key = ?");
				
				// ps.setInt(1,0);
				ps.setString(1,locIndex);
				ps.setString(2,questionAttempted);
				ps.setString(3,helperFlag);
				ps.setString(4,userId);
				ps.setString(5,trailKey);
								
				ps.executeUpdate();
			
			}else{
				ps = conn.prepareStatement("INSERT into MathTrail_UserTrail (User_Id,Trail_Key,Loc_Index,Start_Time,Gold_Score,Silver_Score,Copper_Score,Question_Attempted,Helper_Flag,Trail_Complete) Values(?,?,?,NOW(),0,0,0,'N','N','N')");
				
				// ps.setInt(1,0);
				ps.setString(1,userId);
				ps.setString(2,trailKey);
				ps.setString(3,locIndex);
				
				ps.executeUpdate();
			}		
			
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
	
	public int countUserTrailLoc(){
		
			Connection conn = DBConnection.getDBConnection();
			ResultSet rs = null;
			int count = 0;
		
			try{
				PreparedStatement ps = conn.prepareStatement("Select count(*) from MathTrail_UserTrail where User_Id = ? and Trail_Key = ?");
				
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
	
	public String updateCoinScore()
	{
		
		Connection conn = DBConnection.getDBConnection();
		PreparedStatement ps;
		
		 Map map = getParameters();
		 
		 System.out.println("Inside updateCoinScore .... ");
		
		  String[] tmp = (String[])map.get("userId");
		  
		  System.out.println("The userId is " + tmp[0]);
		  
		  userId = tmp[0];
		  
		  String[] tmp1 = (String[])map.get("trailKey");
		  
		  System.out.println("The trailKey is " + tmp1[0]);		
		  
		  trailKey = tmp1[0];
		  
		  String[] tmp2 = (String[])map.get("goldScore");
		  
		  System.out.println("The goldScore is " + tmp2[0]);		
		  
		  goldScore = tmp2[0];     	
		  
		  String[] tmp3 = (String[])map.get("silverScore");
		  
		  System.out.println("The silverScore is " + tmp3[0]);		
		  
		  silverScore = tmp3[0];    
		  
		  String[] tmp4 = (String[])map.get("copperScore");
		  
		  System.out.println("The copperScore is " + tmp4[0]);		
		  
		  copperScore = tmp4[0];  
		  		  
		  String[] tmp5 = (String[])map.get("trailComplete");
		  
		  System.out.println("The trailComplete is " + tmp5[0]);		
		  
		  setTrailComplete(tmp5[0]);
		  
		  int goldScoreInt = Integer.parseInt(goldScore);
		  int silverScoreInt = Integer.parseInt(silverScore);
		  int copperScoreInt = Integer.parseInt(copperScore);
		  int totalScore = goldScoreInt + silverScoreInt + copperScoreInt;
		  
		  if( totalScore > getTrailMaxLocCount() )
		  {
			  return SUCCESS;			  
		  }
		 		
		 try{
				ps = conn.prepareStatement("Update MathTrail_UserTrail set Question_Attempted = 'Y',Helper_Flag = 'N',End_Time = NOW(),Gold_Score = ?,Silver_Score = ?,Copper_Score = ?,Trail_Complete = ? where User_Id = ? and Trail_Key = ?");
				
				// ps.setInt(1,0);
				ps.setString(1,goldScore);
				ps.setString(2,silverScore);
				ps.setString(3,copperScore);
				ps.setString(4,trailComplete);
				ps.setString(5,userId);
				ps.setString(6,trailKey);
												
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
	
	private int getTrailMaxLocCount(){
		int trailMaxLocCount = 0;
		
		trailMaxLocCount = (Integer)((GetAllTrailDetails.getAllTrailDetailsMap()).get(trailKey)).intValue();
		
		System.out.println("The trailCount for " + trailKey + " is " + trailMaxLocCount);	
		
		return trailMaxLocCount;
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

	public String getHelperFlag() {
		return helperFlag;
	}

	public void setHelperFlag(String helperFlag) {
		this.helperFlag = helperFlag;
	}

	public void setCopperScore(String copperScore) {
		this.copperScore = copperScore;
	}

	public String getCopperScore() {
		return copperScore;
	}

	public void setTrailComplete(String trailComplete) {
		this.trailComplete = trailComplete;
	}

	public String getTrailComplete() {
		return trailComplete;
	}

	public void setQuestionAttempted(String questionAttempted) {
		this.questionAttempted = questionAttempted;
	}

	public String getQuestionAttempted() {
		return questionAttempted;
	}
	
	
	
}
