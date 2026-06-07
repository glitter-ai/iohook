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
		"defines": [
			"NAPI_VERSION=9"
		],
		"cflags_cc!": ["-fno-exceptions"],
		"link_settings": {
				"libraries": [
						"-Wl,-rpath,@executable_path/.",
						"-Wl,-rpath,@loader_path/.",
						"-Wl,-rpath,<!(pwd)/build/Release/"
				]
		},
		"include_dirs": [
			"<!(node -p \"require('node-addon-api').include_dir\")",
			"libuiohook/include"
		],
		"xcode_settings": {
			"GCC_ENABLE_CPP_EXCEPTIONS": "YES",
			"CLANG_CXX_LIBRARY": "libc++",
			"CLANG_CXX_LANGUAGE_STANDARD": "c++17",
			"MACOSX_DEPLOYMENT_TARGET": "12.3"
		},
		"configurations": {
			"Release": {
			}
		}
	}]
}
