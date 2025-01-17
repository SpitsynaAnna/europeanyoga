<?php
namespace WprAddons\Modules\ContentTicker;

use WprAddons\Base\Module_Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class Module extends Module_Base {

	public function get_widgets() {
		return [
			'Wpr_Content_Ticker',
		];
	}

	public function get_name() {
		return 'wpr-content-ticker';
	}
}
