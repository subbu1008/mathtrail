package com.heymath.mathtrail.vo;

public class TrailConfigDataVO {
	
	String trailKey;
	String trailName;	
	String trailDesc;	
	int maxLocCount;
	String trailLiveStatus;	
	String trailDiffLevel;

	public String getTrailName() {
		return trailName;
	}
	public void setTrailName(String trailName) {
		this.trailName = trailName;
	}
	public String getTrailDesc() {
		return trailDesc;
	}
	public void setTrailDesc(String trailDesc) {
		this.trailDesc = trailDesc;
	}
	public String getTrailKey() {
		return trailKey;
	}
	public void setTrailKey(String trailKey) {
		this.trailKey = trailKey;
	}
	public int getMaxLocCount() {
		return maxLocCount;
	}
	public void setMaxLocCount(int maxLocCount) {
		this.maxLocCount = maxLocCount;
	}
	public String getTrailLiveStatus() {
		return trailLiveStatus;
	}
	public void setTrailLiveStatus(String trailLiveStatus) {
		this.trailLiveStatus = trailLiveStatus;
	}
	public String getTrailDiffLevel() {
		return trailDiffLevel;
	}
	public void setTrailDiffLevel(String trailDiffLevel) {
		this.trailDiffLevel = trailDiffLevel;
	}

	
}
