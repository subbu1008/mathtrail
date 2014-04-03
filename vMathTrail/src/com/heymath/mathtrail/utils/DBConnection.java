package com.heymath.mathtrail.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

public class DBConnection {
	
	private static DataSource dbConnPool;
	
	public static void getDBConnectionPool() {
	      try {
	         // Create a JNDI Initial context to be able to lookup the DataSource
	         InitialContext ctx = new InitialContext();
	         // Lookup the DataSource, which will be backed by a pool
	         //   that the application server provides.
	         dbConnPool = (DataSource)ctx.lookup("java:comp/env/jdbc/MathTrailDB");
	         if (dbConnPool == null)
	        	System.out.println("Unknown DataSource 'jdbc/MathTrailDB'");
	           // throw new Exception("Unknown DataSource 'jdbc/MathTrailDB'");
	      } catch (NamingException ex) {
	         ex.printStackTrace();
	      }
	   }
	
	public static Connection getDBConnection()	
	{
		Connection dbConn = null;
		
		// getDBConnectionPool();		
		
		// String jdbcConnString = System.getProperty("JDBC_CONNECTION_STRING");
		
		String jdbcConnString = "jdbc:mysql://rhea.sankhyaa.com/mathtrail?user=root&password=0ct0pus&autoReconnect=true";
		
		System.out.println("The JDBC_CONNECTION_STRING is : " + jdbcConnString);
		
		try {
			
			Class.forName("com.mysql.jdbc.Driver");
			dbConn = DriverManager.getConnection(jdbcConnString);		
			
			// System.out.println("DB connection successful!");
			
		}catch (SQLException ex) {
	         ex.printStackTrace();
	      }catch (Exception ex) {
		         ex.printStackTrace();
		      }
		
		return dbConn;
	}

}
