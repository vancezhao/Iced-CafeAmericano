package com.cmpsoft.mobile.plugin.exitapp;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.widget.Toast;

public class ExitApp extends CordovaPlugin {
	private long exitTime = 0;
	public boolean execute(String action, JSONArray args,
			CallbackContext callbackContext) throws JSONException {
		if ((System.currentTimeMillis() - exitTime) > 2000) {
			Toast.makeText(this.cordova.getActivity(), "再按一次退出程序",
					Toast.LENGTH_SHORT).show();
			exitTime = System.currentTimeMillis();
		} else {
			this.cordova.getActivity().finish();
			System.exit(0);
		}
		return true;
	}
}
