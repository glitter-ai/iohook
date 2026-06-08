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
						"-lxcb",
						"-lxkbcommon-x11",
						"-lxkbcommon",
						"-lxkbfile",
						"-lXt",
						"-lXinerama",
						"-lXtst"
				]
		},
		"defines": [
			"USE_XKB_COMMON",
			"USE_XKB_FILE",
			"USE_XT",
			"USE_XINERAMA",
			"USE_XTEST",
			"USE_EVDEV"
		],
		"include_dirs": [
			'libuiohook/include',
			'libuiohook/src'
		]
	}]
}
