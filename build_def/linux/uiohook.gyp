{
	"targets": [{
		"target_name": "uiohook",
		"type": "shared_library",
		"sources": [
			"libuiohook/include/uiohook.h",
			"libuiohook/src/logger.c",
			"libuiohook/src/logger.h",
			"libuiohook/src/x11/input_helper.h",
			"libuiohook/src/x11/input_helper.c",
			"libuiohook/src/x11/input_hook.c",
			"libuiohook/src/x11/post_event.c",
			"libuiohook/src/x11/system_properties.c"
		],
		"cflags": [
			"-std=c++14",
			"-fPIC"
		],
		"link_settings": {
				"libraries": [
						"-Wl,-rpath,$$ORIGIN",
						"-Wl,-rpath,<!(pwd)/build/Release/",
						"-lX11",
						"-lX11-xcb",
						"-lxkbcommon-x11",
						"-lxkbcommon",
						"-lXtst"
				]
		},
		"defines": [
			"USE_XKBCOMMON"
		],
		"include_dirs": [
			'libuiohook/include',
			'libuiohook/src'
		]
	}]
}
