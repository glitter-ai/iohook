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
		"include_dirs": [
			"<!(node -p \"require('node-addon-api').include_dir\")",
			"libuiohook/include"
		],
		"configurations": {
			"Release": {
				"msvs_settings": {
					"VCCLCompilerTool": {
						'ExceptionHandling': 1
					}
				}
			}
		}
	}]
}
