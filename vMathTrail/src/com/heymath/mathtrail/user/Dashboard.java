package com.heymath.mathtrail.user;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Map;

import org.apache.struts2.interceptor.ParameterAware;

import com.heymath.mathtrail.utils.DBConnection;
import com.heymath.mathtrail.utils.GetAllTrailDetails;
import com.heymath.mathtrail.vo.DashboardDataVO;
import com.heymath.mathtrail.vo.TrailConfigDataVO;
import com.opensymphony.xwork2.ActionSupport;

public class Dashboard extends ActionSupport implements ParameterAware {

	private String trailKey;
	
	private ArrayList<DashboardDataVO> dashBoardData;
	private ArrayList<TrailConfigDataVO> allTrailDetails;
	
	private Map parameters;
	
	PreparedStatement ps;
	
	public Map getParameters() {
        return parameters;
    }
	
	public void setParameters(Map param) {
        this.parameters = param;
    }
	

	public String getDashBoard()
	{
		
		Connection conn = DBConnection.getDBConnection();
		
		 try{
			 
			  Map map = getParameters();
			  trailKey = null;
				
			  String[] tmp1 = (String[])map.get("trailKey");
			  
			  if(tmp1 != null){
				  System.out.println("The trailKey is " + tmp1[0]);
				  trailKey = tmp1[0];
			  }	
			  
			  
			  String latestTrailKey = (getAllTrailDetails().get(0)).getTrailKey();
			  
			  System.out.println("The latestTrailKey is : "+ latestTrailKey);
			  
			 
			  if( trailKey == null || trailKey.trim() == "" ){					
				  trailKey = latestTrailKey;
				}
			  
			 PreparedStatement ps = conn.prepareStatement("Select a.User_id,a.Country,b.Loc_Index,a.First_name,b.Trail_Key,b.Gold_Score,b.Silver_Score,b.Copper_Score,b.Trail_Complete,(4 * b.Gold_Score + 2 * b.Silver_Score + 1 * b.Copper_Score) as Total_Score,TIME_FORMAT(TIMEDIFF(b.End_Time,b.Start_Time),'%H hrs %i mins  %s secs') as Time_Taken,a.Institute from MathTrail_Users a,MathTrail_UserTrail b where a.User_id = b.User_Id and b.Trail_Key = ? order by Total_Score desc,Time_Taken asc LIMIT 20;");
				
				// ps.setInt(1,0);
				ps.setString(1,trailKey);
																		
				ps.executeQuery();
				
				dashBoardData = new ArrayList<DashboardDataVO>();
				
				ResultSet rs = ps.executeQuery();
				
				int rank = 0;
				
				 while (rs.next()) {
					 
					 rank++;
					 
					  DashboardDataVO aDashboardDataVO = new DashboardDataVO();
					  
					  aDashboardDataVO.setPlayerRank(String.valueOf(rank));
					  System.out.println("The user-id retrieved for the e-mail is : "+ aDashboardDataVO.getPlayerRank());
					 
					  aDashboardDataVO.setUserId(rs.getString(1));
					  System.out.println("The user-id retrieved for the e-mail is : "+ aDashboardDataVO.getUserId());
					  
					  aDashboardDataVO.setCountry(rs.getString(2));
					  System.out.println("The Country retrieved for the e-mail is : "+ aDashboardDataVO.getCountry());
					  
					  aDashboardDataVO.setLocIndex(String.valueOf(rs.getInt(3)));
					  System.out.println("The locIndex retrieved for the e-mail is : "+ aDashboardDataVO.getLocIndex());
					  
					  aDashboardDataVO.setUserName(rs.getString(4));
					  System.out.println("The UserName retrieved for the e-mail is : "+ aDashboardDataVO.getUserName());
					  
					  aDashboardDataVO.setTrailKey(rs.getString(5));
					  System.out.println("The TrailKey retrieved for the e-mail is : "+ aDashboardDataVO.getTrailKey());
					  
					  aDashboardDataVO.setGoldScore(String.valueOf(rs.getInt(6)));
					  System.out.println("The goldScore retrieved for the e-mail is : "+ aDashboardDataVO.getGoldScore());
					  
					  aDashboardDataVO.setSilverScore(String.valueOf(rs.getInt(7)));
					  System.out.println("The silverScore retrieved for the e-mail is : "+ aDashboardDataVO.getSilverScore());
					  
					  aDashboardDataVO.setCopperScore(String.valueOf(rs.getInt(8)));
					  System.out.println("The copperScore retrieved for the e-mail is : "+ aDashboardDataVO.getCopperScore());
					  
					  aDashboardDataVO.setTrailComplete(rs.getString(9));
					  System.out.println("The TrailComplete retrieved for the e-mail is : "+ aDashboardDataVO.getTrailComplete());
					  
					  aDashboardDataVO.setTotalTime(rs.getString(11));
					  System.out.println("The Total time retrieved for the e-mail is : "+ aDashboardDataVO.getTotalTime());
					  
					  aDashboardDataVO.setInstitution(rs.getString(12));
					  System.out.println("The Institution retrieved for the e-mail is : "+ aDashboardDataVO.getInstitution());
					  
					  dashBoardData.add(aDashboardDataVO);
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
	
	public void setDashBoardData(ArrayList<DashboardDataVO> dashBoardData) {
		this.dashBoardData = dashBoardData;
	}

	public ArrayList<DashboardDataVO> getDashBoardData() {
		return dashBoardData;
	}
	
	public String getTrailKey() {
		return trailKey;
	}

	public void setTrailKey(String trailKey) {
		this.trailKey = trailKey;
	}
	
	public ArrayList<TrailConfigDataVO> getAllTrailDetails() {
		allTrailDetails = GetAllTrailDetails.getAllTrailDetails();
		return allTrailDetails;
	}
}
