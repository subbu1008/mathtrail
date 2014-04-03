package com.heymath.mathtrail.utils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import com.heymath.mathtrail.utils.DBConnection;
import com.heymath.mathtrail.vo.TrailConfigDataVO;

public class GetAllTrailDetails {

	private static ArrayList<TrailConfigDataVO> allTrailDetails;
	private static HashMap<String,Integer> allTrailDetailsMap;
	
	static {
		getTrailConfig();
	}
	
	public static ArrayList<TrailConfigDataVO> getAllTrailDetails()
	{
		return allTrailDetails;
	}
	
	public static HashMap<String,Integer> getAllTrailDetailsMap()
	{
		return allTrailDetailsMap;
	}
	
	// private JSONObject oUserCount = new JSONObject();
	
	public static void getTrailConfig(){
		
		Connection conn = DBConnection.getDBConnection();
		
		ResultSet rs = null;
		PreparedStatement ps = null;
				
		// System.out.println("The email received in checkUser is " + email);
			
		try{
			ps = conn.prepareStatement("select a.TrailKey,a.MaxLocCount,a.TrailName,a.TrailDesc,b.TrailLiveStatus,b.TrailPosition,a.DiffLevel from MathTrail_TrailConfig a,MathTrail_TrailStatus b where a.TrailKey = b.TrailKey order by b.TrailPosition");
			
			ps.executeQuery();
			
			rs = ps.executeQuery();
			
			allTrailDetails = new ArrayList<TrailConfigDataVO>();
			allTrailDetailsMap = new HashMap<String,Integer>();
			
			 while (rs.next()) {
		
				 TrailConfigDataVO aTrailConfigDataVO = new TrailConfigDataVO();
				 
				 aTrailConfigDataVO.setTrailKey(rs.getString(1));
				 System.out.println("The Trail Key is : "+ rs.getString(1));
				 
				 aTrailConfigDataVO.setMaxLocCount(rs.getInt(2));
				 System.out.println("The Trail loc count is : "+ aTrailConfigDataVO.getMaxLocCount());
				 
				 aTrailConfigDataVO.setTrailName(rs.getString(3));
				 System.out.println("The Trail name is : "+ aTrailConfigDataVO.getTrailName());
				 
				 aTrailConfigDataVO.setTrailDesc(rs.getString(4));
				 System.out.println("The Trail loc count is : "+ aTrailConfigDataVO.getTrailDesc());
				  
				 aTrailConfigDataVO.setTrailLiveStatus(rs.getString(5));
				 System.out.println("The Trail live status is : "+ aTrailConfigDataVO.getTrailLiveStatus());
				 
				 System.out.println("The Trail position is : "+ rs.getInt(6));
				 
				 aTrailConfigDataVO.setTrailDiffLevel(rs.getString(7));
				 System.out.println("The Trail difficulty level is : "+ rs.getString(7));
				 				 
				 allTrailDetails.add(aTrailConfigDataVO);
				 allTrailDetailsMap.put(aTrailConfigDataVO.getTrailKey(), new Integer(aTrailConfigDataVO.getMaxLocCount()));
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
				
						
	}
	
}
