<?php
namespace WprAddons\Modules\ElementorTemplate\Widgets;

use Elementor\Controls_Manager;
use Elementor\Widget_Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Wpr_Elementor_Template extends Widget_Base {
		
	public function get_name() {
		return 'wpr-elementor-template';
	}

	public function get_title() {
		return esc_html__( 'Template', 'wpr-addons' );
	}

	public function get_icon() {
		return 'wpr-icon eicon-document-file';
	}

	public function get_categories() {
		return [ 'wpr-widgets'];
	}

	public function get_keywords() {
		return [ 'royal', 'elementor', 'template', 'load' ];
	}

    public function get_custom_help_url() {
    	if ( empty(get_option('wpr_wl_plugin_links')) )
        // return 'https://royal-elementor-addons.com/contact/?ref=rea-plugin-panel-elementor-template-help-btn';
    		return 'https://wordpress.org/support/plugin/royal-elementor-addons/';
    }

	protected function register_controls() {
		
		// Section: General ----------
		$this->start_controls_section(
			'section_general',
			[
				'label' => esc_html__( 'General', 'wpr-addons' ),
			]
		);
		
		$templates_select = [];

		// Get All Templates
		$templates = get_posts( [
			'post_type'   => array( 'elementor_library' ),
			'post_status' => array( 'publish' ),
			'meta_key' 	  => '_elementor_template_type',
			'meta_value'  => ['page', 'section'],
			'numberposts'  => -1
		] );

		if ( ! empty( $templates ) ) {
			foreach ( $templates as $template ) {
				$templates_select[$template->ID] = $template->post_title;
			}
		}

		$this->add_control(
			'select_template' ,
			[
				'label' => esc_html__( 'Select Template', 'wpr-addons' ),
				'type' => Controls_Manager::SELECT2,
				'options' => $templates_select,
			]
		);

		// Restore original Post Data
		wp_reset_postdata();

		$this->end_controls_section(); // End Controls Section
	}
		

	protected function render() {
		// Get Settings
		$settings = $this->get_settings();

		if ( '' !== $settings['select_template'] ) {
			$edit_link = '<span class="wpr-template-edit-btn" data-permalink="'. esc_url(get_permalink($settings['select_template'])) .'">Edit Template</span>';
		
			$type = get_post_meta(get_the_ID(), '_wpr_template_type', true);
			$has_css = 'internal' === get_option( 'elementor_css_print_method' ) || '' !== $type;

			echo \Elementor\Plugin::instance()->frontend->get_builder_content_for_display( $settings['select_template'], $has_css ) . $edit_link; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}
	}
}