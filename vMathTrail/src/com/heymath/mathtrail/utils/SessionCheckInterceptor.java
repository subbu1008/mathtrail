package com.heymath.mathtrail.utils;

import java.util.Map;


import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;


public class SessionCheckInterceptor implements Interceptor{
	private static final long serialVersionUID = 1L;


	public void destroy() {
		System.out.println("SessionCheckInterceptor destroy() is called...");
	}


	public void init() {
		System.out.println(" SessionCheckInterceptor init() is called...");
	}


	public String intercept(ActionInvocation actionInvocation) throws Exception {
			ActionContext context = actionInvocation.getInvocationContext();
			Map<String, Object> sessionMap = context.getSession();
			System.out.println("Retrived session..."+ sessionMap);		
		/*	if(sessionMap == null || sessionMap.isEmpty() || ActionContext.getContext().getSession().get("userId") == null ) { */		
			if(ActionContext.getContext().getSession().get("userId") == null ) { 
				System.out.println("Session expired...");
			  return "sessionexpired";
			}
			
			String actionResult = actionInvocation.invoke();
			
			return actionResult;
		}
}
