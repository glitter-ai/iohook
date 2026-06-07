{
	"targets": [{
		"target_name": "iohook",
		"win_delay_load_hook": "true",
		"type": "loadable_module",
		"sources": [
			"src/iohook.cc"
		],
		"dependencies": [
			"./uiohook.gyp:uiohook"
		],
		"cflags_cc": [
			"-std=c++17",
			"-fPIC"
		],
		"cflags_cc!": ["-fno-exceptions"],
		"defines": [
			"USE_XKBCOMMON",
			"NAPI_VERSION=9"
		],
		"link_settings": {
				"libraries": [
						"-Wl,-rpath,$$ORIGIN",
						"-Wl,-rpath,<!(pwd)/build/Release/"
				]
		},
		"include_dirs": [
			"<!(node -p \"require('node-addon-api').include_dir\")",
			"libuiohook/include"
		],
		"configurations": {
			"Release": {
			}
		}
	}]
}
