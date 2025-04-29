
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const SHELL: string;
	export const __ETC_PROFILE_DONE: string;
	export const COLORTERM: string;
	export const HYPRLAND_CMD: string;
	export const XDG_CONFIG_DIRS: string;
	export const hardeningDisable: string;
	export const NIX_LD_LIBRARY_PATH: string;
	export const configureFlags: string;
	export const SPEECHD_CMD: string;
	export const XDG_BACKEND: string;
	export const mesonFlags: string;
	export const PKG_CONFIG_PATH: string;
	export const LAST_EXIT_CODE: string;
	export const DIRENV_ACTIVE: string;
	export const NODE: string;
	export const LC_ADDRESS: string;
	export const DEVENV_DIRENVRC_VERSION: string;
	export const LC_NAME: string;
	export const DIRENV_DIR: string;
	export const STRINGS: string;
	export const XCURSOR_PATH: string;
	export const PROMPT_MULTILINE_INDICATOR: string;
	export const npm_config_local_prefix: string;
	export const PROMPT_INDICATOR_VI_INSERT: string;
	export const DESKTOP_SESSION: string;
	export const LC_MONETARY: string;
	export const KITTY_PID: string;
	export const HL_INITIAL_WORKSPACE_TOKEN: string;
	export const NO_AT_BRIDGE: string;
	export const XCURSOR_SIZE: string;
	export const DIRENV_FILE: string;
	export const EDITOR: string;
	export const XDG_SEAT: string;
	export const PWD: string;
	export const NIX_PROFILES: string;
	export const SOURCE_DATE_EPOCH: string;
	export const XDG_SESSION_DESKTOP: string;
	export const LOGNAME: string;
	export const QT_QPA_PLATFORMTHEME: string;
	export const XDG_SESSION_TYPE: string;
	export const NIX_ENFORCE_NO_NATIVE: string;
	export const CLIPBOARD: string;
	export const NIX_PATH: string;
	export const NIXPKGS_CONFIG: string;
	export const CXX: string;
	export const _: string;
	export const CMD_DURATION_MS: string;
	export const system: string;
	export const KITTY_PUBLIC_KEY: string;
	export const TRANSIENT_PROMPT_MULTILINE_INDICATOR: string;
	export const DEVENV_DOTFILE: string;
	export const TERMINAL: string;
	export const YDOTOOL_SOCKET: string;
	export const DEVENV_DIRENVRC_ROLLING_UPGRADE: string;
	export const IN_NIX_SHELL: string;
	export const HOME: string;
	export const NIX_BINTOOLS: string;
	export const SSH_ASKPASS: string;
	export const LC_PAPER: string;
	export const LANG: string;
	export const NIXOS_OZONE_WL: string;
	export const _JAVA_AWT_WM_NONREPARENTING: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const npm_package_version: string;
	export const STARSHIP_SHELL: string;
	export const WAYLAND_DISPLAY: string;
	export const cmakeFlags: string;
	export const GIO_EXTRA_MODULES: string;
	export const KITTY_WINDOW_ID: string;
	export const RUSTFLAGS: string;
	export const FILE_MANAGER: string;
	export const NIX_STORE: string;
	export const DEVENV_ROOT: string;
	export const LD: string;
	export const MENU: string;
	export const RUST_SRC_PATH: string;
	export const DIRENV_DIFF: string;
	export const LOGOUT: string;
	export const READELF: string;
	export const GTK_A11Y: string;
	export const STARSHIP_SESSION_KEY: string;
	export const NIX_USER_PROFILE_DIR: string;
	export const INFOPATH: string;
	export const TERMINFO: string;
	export const TERM: string;
	export const LC_IDENTIFICATION: string;
	export const npm_package_name: string;
	export const PROMPT_INDICATOR_VI_NORMAL: string;
	export const GTK_PATH: string;
	export const SIZE: string;
	export const USER: string;
	export const PROMPT_INDICATOR: string;
	export const TZDIR: string;
	export const NIX_LD: string;
	export const CARGO_INSTALL_ROOT: string;
	export const AR: string;
	export const AS: string;
	export const HYPRLAND_INSTANCE_SIGNATURE: string;
	export const NIX_BINTOOLS_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
	export const DISPLAY: string;
	export const npm_lifecycle_event: string;
	export const DEVENV_TASKS: string;
	export const SHLVL: string;
	export const DEVENV_RUNTIME: string;
	export const MOZ_ENABLE_WAYLAND: string;
	export const NM: string;
	export const PAGER: string;
	export const NIX_CFLAGS_COMPILE: string;
	export const LC_TELEPHONE: string;
	export const QTWEBKIT_PLUGIN_PATH: string;
	export const LC_MEASUREMENT: string;
	export const __NIXOS_SET_ENVIRONMENT_DONE: string;
	export const XDG_VTNR: string;
	export const XDG_SESSION_ID: string;
	export const TRANSIENT_PROMPT_COMMAND_RIGHT: string;
	export const LOCALE_ARCHIVE: string;
	export const LESSKEYIN_SYSTEM: string;
	export const npm_config_user_agent: string;
	export const QML2_IMPORT_PATH: string;
	export const TERMINFO_DIRS: string;
	export const npm_execpath: string;
	export const XDG_RUNTIME_DIR: string;
	export const DEVENV_PROFILE: string;
	export const DIRENV_WARN_TIMEOUT: string;
	export const NIX_PKG_CONFIG_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
	export const NODE_PATH: string;
	export const OBJCOPY: string;
	export const NIX_XDG_DESKTOP_PORTAL_DIR: string;
	export const npm_package_json: string;
	export const LC_TIME: string;
	export const NU_VERSION: string;
	export const STRIP: string;
	export const XDG_DATA_DIRS: string;
	export const LIBEXEC_PATH: string;
	export const OBJDUMP: string;
	export const BROWSER: string;
	export const PATH: string;
	export const GREET: string;
	export const CC: string;
	export const CFLAGS: string;
	export const NIX_CC: string;
	export const FILE_PWD: string;
	export const NIX: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const DIRENV_WATCHES: string;
	export const NIX_CC_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
	export const DEVENV_STATE: string;
	export const QT_PLUGIN_PATH: string;
	export const CONFIG_SHELL: string;
	export const CURRENT_FILE: string;
	export const KITTY_INSTALLATION_DIR: string;
	export const npm_node_execpath: string;
	export const RUSTDOCFLAGS: string;
	export const RANLIB: string;
	export const NIX_HARDENING_ENABLE: string;
	export const LC_NUMERIC: string;
	export const OLDPWD: string;
	export const NIX_LDFLAGS: string;
	export const name: string;
	export const PKG_CONFIG: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		SHELL: string;
		__ETC_PROFILE_DONE: string;
		COLORTERM: string;
		HYPRLAND_CMD: string;
		XDG_CONFIG_DIRS: string;
		hardeningDisable: string;
		NIX_LD_LIBRARY_PATH: string;
		configureFlags: string;
		SPEECHD_CMD: string;
		XDG_BACKEND: string;
		mesonFlags: string;
		PKG_CONFIG_PATH: string;
		LAST_EXIT_CODE: string;
		DIRENV_ACTIVE: string;
		NODE: string;
		LC_ADDRESS: string;
		DEVENV_DIRENVRC_VERSION: string;
		LC_NAME: string;
		DIRENV_DIR: string;
		STRINGS: string;
		XCURSOR_PATH: string;
		PROMPT_MULTILINE_INDICATOR: string;
		npm_config_local_prefix: string;
		PROMPT_INDICATOR_VI_INSERT: string;
		DESKTOP_SESSION: string;
		LC_MONETARY: string;
		KITTY_PID: string;
		HL_INITIAL_WORKSPACE_TOKEN: string;
		NO_AT_BRIDGE: string;
		XCURSOR_SIZE: string;
		DIRENV_FILE: string;
		EDITOR: string;
		XDG_SEAT: string;
		PWD: string;
		NIX_PROFILES: string;
		SOURCE_DATE_EPOCH: string;
		XDG_SESSION_DESKTOP: string;
		LOGNAME: string;
		QT_QPA_PLATFORMTHEME: string;
		XDG_SESSION_TYPE: string;
		NIX_ENFORCE_NO_NATIVE: string;
		CLIPBOARD: string;
		NIX_PATH: string;
		NIXPKGS_CONFIG: string;
		CXX: string;
		_: string;
		CMD_DURATION_MS: string;
		system: string;
		KITTY_PUBLIC_KEY: string;
		TRANSIENT_PROMPT_MULTILINE_INDICATOR: string;
		DEVENV_DOTFILE: string;
		TERMINAL: string;
		YDOTOOL_SOCKET: string;
		DEVENV_DIRENVRC_ROLLING_UPGRADE: string;
		IN_NIX_SHELL: string;
		HOME: string;
		NIX_BINTOOLS: string;
		SSH_ASKPASS: string;
		LC_PAPER: string;
		LANG: string;
		NIXOS_OZONE_WL: string;
		_JAVA_AWT_WM_NONREPARENTING: string;
		XDG_CURRENT_DESKTOP: string;
		npm_package_version: string;
		STARSHIP_SHELL: string;
		WAYLAND_DISPLAY: string;
		cmakeFlags: string;
		GIO_EXTRA_MODULES: string;
		KITTY_WINDOW_ID: string;
		RUSTFLAGS: string;
		FILE_MANAGER: string;
		NIX_STORE: string;
		DEVENV_ROOT: string;
		LD: string;
		MENU: string;
		RUST_SRC_PATH: string;
		DIRENV_DIFF: string;
		LOGOUT: string;
		READELF: string;
		GTK_A11Y: string;
		STARSHIP_SESSION_KEY: string;
		NIX_USER_PROFILE_DIR: string;
		INFOPATH: string;
		TERMINFO: string;
		TERM: string;
		LC_IDENTIFICATION: string;
		npm_package_name: string;
		PROMPT_INDICATOR_VI_NORMAL: string;
		GTK_PATH: string;
		SIZE: string;
		USER: string;
		PROMPT_INDICATOR: string;
		TZDIR: string;
		NIX_LD: string;
		CARGO_INSTALL_ROOT: string;
		AR: string;
		AS: string;
		HYPRLAND_INSTANCE_SIGNATURE: string;
		NIX_BINTOOLS_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
		DISPLAY: string;
		npm_lifecycle_event: string;
		DEVENV_TASKS: string;
		SHLVL: string;
		DEVENV_RUNTIME: string;
		MOZ_ENABLE_WAYLAND: string;
		NM: string;
		PAGER: string;
		NIX_CFLAGS_COMPILE: string;
		LC_TELEPHONE: string;
		QTWEBKIT_PLUGIN_PATH: string;
		LC_MEASUREMENT: string;
		__NIXOS_SET_ENVIRONMENT_DONE: string;
		XDG_VTNR: string;
		XDG_SESSION_ID: string;
		TRANSIENT_PROMPT_COMMAND_RIGHT: string;
		LOCALE_ARCHIVE: string;
		LESSKEYIN_SYSTEM: string;
		npm_config_user_agent: string;
		QML2_IMPORT_PATH: string;
		TERMINFO_DIRS: string;
		npm_execpath: string;
		XDG_RUNTIME_DIR: string;
		DEVENV_PROFILE: string;
		DIRENV_WARN_TIMEOUT: string;
		NIX_PKG_CONFIG_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
		NODE_PATH: string;
		OBJCOPY: string;
		NIX_XDG_DESKTOP_PORTAL_DIR: string;
		npm_package_json: string;
		LC_TIME: string;
		NU_VERSION: string;
		STRIP: string;
		XDG_DATA_DIRS: string;
		LIBEXEC_PATH: string;
		OBJDUMP: string;
		BROWSER: string;
		PATH: string;
		GREET: string;
		CC: string;
		CFLAGS: string;
		NIX_CC: string;
		FILE_PWD: string;
		NIX: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		DIRENV_WATCHES: string;
		NIX_CC_WRAPPER_TARGET_HOST_x86_64_unknown_linux_gnu: string;
		DEVENV_STATE: string;
		QT_PLUGIN_PATH: string;
		CONFIG_SHELL: string;
		CURRENT_FILE: string;
		KITTY_INSTALLATION_DIR: string;
		npm_node_execpath: string;
		RUSTDOCFLAGS: string;
		RANLIB: string;
		NIX_HARDENING_ENABLE: string;
		LC_NUMERIC: string;
		OLDPWD: string;
		NIX_LDFLAGS: string;
		name: string;
		PKG_CONFIG: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
