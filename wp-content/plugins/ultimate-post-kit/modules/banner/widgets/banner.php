<?php

namespace UltimatePostKit\Modules\Banner\Widgets;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Text_Shadow;
use Elementor\Group_Control_Image_Size;
use Elementor\Group_Control_Background;
use UltimatePostKit\Utils;
use Elementor\Icons_Manager;

use UltimatePostKit\Traits\Global_Widget_Controls;
use UltimatePostKit\Includes\Controls\GroupQuery\Group_Control_Query;
use WP_Query;

if (!defined('ABSPATH')) exit; // Exit if accessed directly

class Banner extends Group_Control_Query {

	use Global_Widget_Controls;

	private $_query = null;

	public function get_name() {
		return 'upk-banner';
	}

	public function get_title() {
		return BDTUPK . esc_html__('Banner', 'ultimate-post-kit');
	}

	public function get_icon() {
		return 'upk-widget-icon upk-icon-banner upk-new';
	}

	public function get_categories() {
		return ['ultimate-post-kit'];
	}

	public function get_keywords() {
		return ['post', 'grid', 'blog', 'recent', 'news', 'banner'];
	}

	public function get_style_depends() {
		if ($this->upk_is_edit_mode()) {
			return ['upk-all-styles'];
		} else {
			return ['upk-font', 'upk-banner'];
		}
	}

	public function get_custom_help_url() {
		return 'https://youtu.be/lxGeTthE_lA';
	}

	public function get_query() {
		return $this->_query;
	}

	

	protected function register_controls() {
		$this->start_controls_section(
			'section_content_layout',
			[
				'label' => esc_html__('Layout', 'ultimate-post-kit'),
			]
		);


		$this->add_control(
			'layout_direction',
			[
				'label'      => __('Banner Style', 'ultimate-post-kit'),
				'type'       => Controls_Manager::SELECT,
				'default'    => 'style-1',
				'options'    => [
					'style-1'  => __('Style 1', 'ultimate-post-kit'),
					'style-2' => __('Style 2', 'ultimate-post-kit'),
					'style-3' => __('Style 3', 'ultimate-post-kit'),
					'style-4' => __('Style 4', 'ultimate-post-kit'),
					'style-5' => __('Style 5', 'ultimate-post-kit'),
					'style-6' => __('Style 6', 'ultimate-post-kit'),

				],
			]
		);

		$this->add_responsive_control(
			'default_item_height',
			[
				'label'   => esc_html__('Item Height(px)', 'ultimate-post-kit'),
				'type'    => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'min' => 200,
						'max' => 1200,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .upk-banner-wrap .upk-item' => 'height: {{SIZE}}{{UNIT}};',
				],
				
			]
		);

		
		$this->add_responsive_control(
			'alignment',
			[
				'label'   => esc_html__( 'Alignment', 'ultimate-post-kit-pro' ),
				'type'    => Controls_Manager::CHOOSE,
				'options' => [
					'left' => [
						'title' => esc_html__( 'Left', 'ultimate-post-kit-pro' ),
						'icon'  => 'eicon-text-align-left',
					],
					'center' => [
						'title' => esc_html__( 'Center', 'ultimate-post-kit-pro' ),
						'icon'  => 'eicon-text-align-center',
					],
					'right' => [
						'title' => esc_html__( 'Right', 'ultimate-post-kit-pro' ),
						'icon'  => 'eicon-text-align-right',
					],
					'space-between' => [
						'title' => esc_html__( 'Justify', 'ultimate-post-kit-pro' ),
						'icon'  => 'eicon-text-align-justify',
					],
				],
				'selectors' => [
					'{{WRAPPER}} .upk-banner-wrap .upk-content' => 'text-align: {{VALUE}};',
				],
				// 'condition' => [
				// 	'layout_style' => 'inline'
				// ]
			]
		);


		$this->add_control(
			'title_text',
			[
				'label'   => __('Title', 'ultimate-post-kit'),
				'type'    => Controls_Manager::TEXT,
				'dynamic' => [
					'active' => true,
				],
				'default'     => __('Newspaper', 'ultimate-post-kit'),
				'placeholder' => __('Enter your title', 'ultimate-post-kit'),
			]
		);

		$this->add_control(
			'title_link',
			[
				'label'        => __('Title Link', 'ultimate-post-kit'),
				'type'         => Controls_Manager::SWITCHER,
				'prefix_class' => 'bdt-title-link-'
			]
		);


		$this->add_control(
			'title_link_url',
			[
				'label'       => __('Title Link URL', 'ultimate-post-kit'),
				'type'        => Controls_Manager::URL,
				'dynamic'     => ['active' => true],
				'placeholder' => 'http://your-link.com',
				'condition'   => [
					'title_link' => 'yes'
				]
			]
		);


		$this->add_control(
			'title_size',
			[
				'label'   => __('Title HTML Tag', 'ultimate-post-kit'),
				'type'    => Controls_Manager::SELECT,
				'default' => 'h3',
				'options' => ultimate_post_kit_title_tags(),
			]
		);
		
		$this->add_control(
			'show_sub_title',
			[
				'label'        => __('Show Sub Title', 'ultimate-post-kit'),
				'type'         => Controls_Manager::SWITCHER,
				'default'     => 'yes',
				'separator' => 'before',
			]
		);

		$this->add_control(
			'sub_title_text',
			[
				'label'   => __('Sub Title', 'ultimate-post-kit'),
				'type'    => Controls_Manager::TEXT,
				'dynamic' => [
					'active' => true,
				],
				'default'     => __('The Art Of The Publisher', 'ultimate-post-kit'),
				'placeholder' => __('Enter your sub title', 'ultimate-post-kit'),
				'label_block' => true,
				'condition'	  => [
					'show_sub_title'	=> 'yes',
				],
			]
		);


		$this->add_control(
			'show_text',
			[
				'label'        => __('Show text', 'ultimate-post-kit'),
				'type'         => Controls_Manager::SWITCHER,
				'default'     => 'yes',
				'separator' => 'before',
			]
		);

		$this->add_control(
			'description_text',
			[
				'label'   => __('Text', 'ultimate-post-kit'),
				'type'    => Controls_Manager::TEXTAREA,
				'dynamic' => [
					'active' => true,
				],
				'default'     => __('The Most Popular News Magazine Wordpress Theme', 'ultimate-post-kit'),
				'placeholder' => __('Enter your description', 'ultimate-post-kit'),
				'rows'        => 10,
			]
		);

		$this->add_control(
			'show_badge',
			[
				'label'        => __('Show Badge', 'ultimate-post-kit'),
				'type'         => Controls_Manager::SWITCHER,
				'default'     => 'yes',
				'separator' => 'before',
				// 'condition'	  => [
				// 	'show_badge'	=> 'yes',
				// ],
			
			]
		);

		$this->add_control(
			'badge_text',
			[
				'label'   => __('Badge Text', 'ultimate-post-kit'),
				'type'    => Controls_Manager::TEXT,
				'dynamic' => [
					'active' => true,
				],
				'default'     => __('40% off', 'ultimate-post-kit'),
				'placeholder' => __('Enter your sub title', 'ultimate-post-kit'),
				'label_block' => true,
				'condition'	  => [
					'show_badge'	=> 'yes',
				],
			]
		);


		$this->add_control(
			'show_banner_size',
			[
				'label'        => __('Show Banner Size', 'ultimate-post-kit'),
				'type'         => Controls_Manager::SWITCHER,
				'default'     => 'yes',
				'separator' => 'before',
			]
		);

		$this->add_control(
			'banner_size_text',
			[
				'label'   => __('Banner Size Text', 'ultimate-post-kit'),
				'type'    => Controls_Manager::TEXT,
				'dynamic' => [
					'active' => true,
				],
				'default'     => __('banner 900px x 170px', 'ultimate-post-kit'),
				'placeholder' => __('Enter banner size text', 'ultimate-post-kit'),
				'label_block' => true,
				'condition'	  => [
					'show_banner_size'	=> 'yes',
				],
			]
		);


		$this->add_control(
			'readmore',
			[
				'label'     => __('Read More Button', 'ultimate-post-kit'),
				'type'      => Controls_Manager::SWITCHER,
				'default'   => 'yes',
				'separator' => 'before',
			]
		);


		$this->add_control(
			'image',
			[
				'label'       => __('Image', 'ultimate-post-kit'),
				'type'        => Controls_Manager::MEDIA,
				// 'default'     => ['url' => BDTUPK_ASSETS_URL . 'images/mask/shape-1.svg']
				'default'     => [
					'url' => Utils::get_placeholder_image_src(),
				],
			]
		);

		$this->add_group_control(
			Group_Control_Image_Size::get_type(),
			[
				'name'         => 'thumbnail_size',
				'default'      => 'full',
			]
		);


		$this->end_controls_section();


			$this->start_controls_section(
			'section_content_readmore',
			[
				'label'     => __('Read More', 'ultimate-post-kit'),
				'tab'        => Controls_Manager::TAB_CONTENT,
				'condition' => [
					'readmore' => 'yes',
				],
			]
		);

		$this->add_control(
			'readmore_text',
			[
				'label'       => __('Text', 'ultimate-post-kit'),
				'type'        => Controls_Manager::TEXT,
				'dynamic'     => ['active' => true],
				'default'     => __('Buy now', 'ultimate-post-kit'),
				'placeholder' => __('Buy now', 'ultimate-post-kit'),
			]
		);

		$this->add_control(
			'readmore_link',
			[
				'label'     => __('Link to', 'ultimate-post-kit'),
				'type'      => Controls_Manager::URL,
				'separator' => 'before',
				'dynamic'   => [
					'active' => true,
				],
				'placeholder' => __('https://your-link.com', 'ultimate-post-kit'),
				'default'     => [
					'url' => '#',
				],
				'condition' => [
					'readmore'       => 'yes',
				]
			]
		);

		$this->add_control(
			'onclick',
			[
				'label'     => esc_html__('OnClick', 'ultimate-post-kit'),
				'type'      => Controls_Manager::SWITCHER,
				'condition' => [
					'readmore'       => 'yes',
				]
			]
		);

		$this->add_control(
			'onclick_event',
			[
				'label'       => esc_html__('OnClick Event', 'ultimate-post-kit'),
				'type'        => Controls_Manager::TEXT,
				'placeholder' => 'myFunction()',
				'description' => sprintf(esc_html__('For details please look <a href="%s" target="_blank">here</a>'), 'https://www.w3schools.com/jsref/event_onclick.asp'),
				'condition' => [
					'readmore'       => 'yes',
					'onclick'        => 'yes'
				]
			]
		);

		$this->add_control(
			'advanced_readmore_icon',
			[
				'label'       => __('Icon', 'ultimate-post-kit'),
				'type'             => Controls_Manager::ICONS,
				'fa4compatibility' => 'readmore_icon',
				'separator'   => 'before',
				'label_block' => true,
				'condition'   => [
					'readmore'       => 'yes'
				]
			]
		);

		$this->add_control(
			'readmore_icon_align',
			[
				'label'   => __('Icon Position', 'ultimate-post-kit'),
				'type'    => Controls_Manager::SELECT,
				'default' => 'right',
				'options' => [
					'left'   => __('Left', 'ultimate-post-kit'),
					'right'  => __('Right', 'ultimate-post-kit'),
				],
				'condition' => [
					'advanced_readmore_icon[value]!' => '',
				],
			]
		);

		$this->add_control(
			'readmore_icon_indent',
			[
				'label' => __('Icon Spacing', 'ultimate-post-kit'),
				'type'  => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'max' => 100,
					],
				],
				'default' => [
					'size' => 0,
				],
				'condition' => [
					'advanced_readmore_icon[value]!' => '',
					'readmore_text!' => '',
				],
				'selectors' => [
					'{{WRAPPER}} .bdt-animated-readmore .bdt-button-icon-align-right' => is_rtl() ? 'margin-right: {{SIZE}}{{UNIT}};' : 'margin-left: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .bdt-animated-readmore .bdt-button-icon-align-left'  => is_rtl() ? 'margin-left: {{SIZE}}{{UNIT}};' : 'margin-right: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'button_css_id',
			[
				'label' => __('Button ID', 'ultimate-post-kit') . BDTUPK,
				'type' => Controls_Manager::TEXT,
				'dynamic' => [
					'active' => true,
				],
				'default' => '',
				'title' => __('Add your custom id WITHOUT the Pound key. e.g: my-id', 'ultimate-post-kit'),
				'description' => __('Please make sure the ID is unique and not used elsewhere on the page this form is displayed. This field allows <code>A-z 0-9</code> & underscore chars without spaces.', 'ultimate-post-kit'),
				'separator' => 'before',
			]
		);

		$this->end_controls_section();

		//Style
		$this->start_controls_section(
			'upk_section_style',
			[
				'label' => esc_html__('Items', 'ultimate-post-kit'),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name' => 'border',
				'selector' => '{{WRAPPER}} .upk-banner-wrap .upk-item',
			]
		);

		$this->add_responsive_control(
			'item_border_radius',
			[
				'label'      => esc_html__('Border Radius', 'ultimate-post-kit'),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => ['px', '%'],
				'selectors'  => [
					'{{WRAPPER}} .upk-banner-wrap .upk-item' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'content_offset',
			[
				'label' => __('Content Spacing', 'ultimate-post-kit'),
				'type'  => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'max' => 200,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .upk-banner-wrap .upk-content' => 'right: {{SIZE}}{{UNIT}}; left: {{SIZE}}{{UNIT}};',
				],
			]
		);


		// $this->add_control(
		// 	'overlay_type',
		// 	[
		// 		'label'   => esc_html__('Overlay', 'ultimate-post-kit-pro'),
		// 		'type'    => Controls_Manager::SELECT,
		// 		'default' => 'background',
		// 		'options' => [
		// 			'none'       => esc_html__('None', 'ultimate-post-kit-pro'),
		// 			'background' => esc_html__('Background', 'ultimate-post-kit-pro'),
		// 			'blend'      => esc_html__('Blend', 'ultimate-post-kit-pro'),
		// 		],
		// 	]
		// );

		// $this->add_control(
		// 	'overlay_color',
		// 	[
		// 		'label'     => esc_html__('Overlay Color', 'ultimate-post-kit'),
		// 		'type'      => Controls_Manager::COLOR,
		// 		'selectors' => [
		// 			'{{WRAPPER}} .upk-banner-wrap .upk-img-wrap::before' => 'background-image: linear-gradient(1deg, {{VALUE}}, transparent);',
		// 		],
		// 		'condition' => [
		// 			'overlay_type' => ['background', 'blend'],
		// 		],
		// 	]
		// );

		// $this->add_control(
		// 	'blend_type',
		// 	[
		// 		'label'     => esc_html__('Blend Type', 'ultimate-post-kit-pro'),
		// 		'type'      => Controls_Manager::SELECT,
		// 		'default'   => 'multiply',
		// 		'options'   => ultimate_post_kit_blend_options(),
		// 		'condition' => [
		// 			'overlay_type' => 'blend',
		// 		],
		// 		'selectors' => [
		// 			'{{WRAPPER}} .upk-banner-wrap .upk-img-wrap::before' => 'mix-blend-mode: {{VALUE}};'
		// 		],
		// 	]
		// );


		$this->add_control(
			'overlay_type',
			[
				'label'   => esc_html__('Overlay', 'pixel-gallery'),
				'type'    => Controls_Manager::SELECT,
				'default' => 'background',
				'options' => [
					'none'       => esc_html__('None', 'pixel-gallery'),
					'background' => esc_html__('Background', 'pixel-gallery'),
					'blend'      => esc_html__('Blend', 'pixel-gallery'),
				],
			]
		);

		$this->add_group_control(
			Group_Control_Background::get_type(),
			[
				'name' => 'overlay_color',
				'label' => esc_html__('Background', 'pixel-gallery'),
				'types' => ['classic', 'gradient'],
				'exclude' => ['image'],
				'selector' => '{{WRAPPER}} .upk-banner-wrap .upk-img-wrap::before',
				'fields_options' => [
					'background' => [
						'default' => 'classic',
					],
					'color' => [
						'default' => 'rgba(0, 0, 0, 0.609)',
					],
				],
				'condition' => [
					'overlay_type' => ['background', 'blend'],
				],
			]
		);

		$this->add_control(
			'blend_type',
			[
				'label'     => esc_html__('Blend Type', 'pixel-gallery'),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'multiply',
				'options'   => ultimate_post_kit_blend_options(),
				'condition' => [
					'overlay_type' => 'blend',
				],
				'selectors' => [
					'{{WRAPPER}} .upk-banner-wrap .upk-img-wrap::before' => 'mix-blend-mode: {{VALUE}};'
				],
			]
		);


		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_title',
			[
				'label'     => esc_html__('Title', 'ultimate-post-kit'),
				'tab'       => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_control(
			'title_color',
			[
				'label'     => esc_html__('Color', 'ultimate-post-kit'),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .upk-banner-wrap .upk-title a' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'title_color_hover',
			[
				'label'     => esc_html__('Hover Color', 'ultimate-post-kit'),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .upk-banner-wrap .upk-title a:hover' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'      => 'title_typography',
				'label'     => esc_html__('Typography', 'ultimate-post-kit'),
				'selector'  => '{{WRAPPER}} .upk-banner-wrap .upk-title',
			]
		);

		$this->add_group_control(
			Group_Control_Text_Shadow::get_type(),
			[
				'name' => 'title_text_shadow',
				'label' => __('Text Shadow', 'ultimate-post-kit'),
				'selector' => '{{WRAPPER}} .upk-banner-wrap .upk-title',
			]
		);

		$this->add_responsive_control(
			'title_spacing',
			[
				'label'       => __('Spacing', 'ultimate-post-kit'),
				'type'        => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 50,
					],
				],
				'selectors'   => [
					'{{WRAPPER}} .upk-banner-wrap .upk-title' => 'padding-bottom: {{SIZE}}px;'
				],
			]
		);

		$this->end_controls_section();


		$this->start_controls_section(
			'section_style_sub_title',
			[
				'label'     => esc_html__('Sub Title', 'ultimate-post-kit'),
				'tab'       => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_control(
			'sub_title_color',
			[
				'label'     => esc_html__('Color', 'ultimate-post-kit'),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .upk-banner-wrap .upk-sub-title' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'      => 'sub_title_typography',
				'label'     => esc_html__('Typography', 'ultimate-post-kit'),
				'selector'  => '{{WRAPPER}} .upk-banner-wrap .upk-sub-title',
			]
		);

		$this->add_group_control(
			Group_Control_Text_Shadow::get_type(),
			[
				'name' => 'sub_title_text_shadow',
				'label' => __('Text Shadow', 'ultimate-post-kit'),
				'selector' => '{{WRAPPER}} .upk-banner-wrap .upk-sub-title',
			]
		);

		$this->add_responsive_control(
			'sub_title_spacing',
			[
				'label'       => __('Spacing', 'ultimate-post-kit'),
				'type'        => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 50,
					],
				],
				'selectors'   => [
					'{{WRAPPER}} .upk-banner-wrap .upk-sub-title' => 'padding-bottom: {{SIZE}}px;'
				],
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_text',
			[
				'label'     => esc_html__('Text', 'ultimate-post-kit'),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [
					'show_text' => 'yes',
				],
			]
		);

		$this->add_control(
			'text_color',
			[
				'label'     => esc_html__('Color', 'ultimate-post-kit'),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .upk-banner-wrap .upk-text' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'text_typography',
				'label'    => esc_html__('Typography', 'ultimate-post-kit'),
				'selector' => '{{WRAPPER}} .upk-banner-wrap .upk-text',
			]
		);

		$this->add_responsive_control(
			'text_spacing',
			[
				'label'       => __('Spacing', 'ultimate-post-kit'),
				'type'        => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 50,
					],
				],
				'selectors'   => [
					'{{WRAPPER}} .upk-banner-wrap .upk-text' => 'padding-bottom: {{SIZE}}px;'
				],
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_link_btn',
			[
				'label'     => esc_html__('Read More', 'ultimate-post-kit'),
				'tab'       => Controls_Manager::TAB_STYLE,
			]
		);


		$this->start_controls_tabs('tabs_link_btn_style');

		$this->start_controls_tab(
			'tab_link_btn_normal',
			[
				'label' => esc_html__('Normal', 'ultimate-post-kit'),
			]
		);

		$this->add_control(
			'link_btn_color',
			[
				'label'     => esc_html__('Color', 'ultimate-post-kit'),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .upk-banner-wrap .upk-buy-btn a' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Background::get_type(),
			[
				'name'      => 'link_btn_background',
				'selector'  => '{{WRAPPER}} .upk-banner-wrap .upk-buy-btn a',
			]
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name'        => 'link_btn_border',
				'selector'    => '{{WRAPPER}} .upk-banner-wrap .upk-buy-btn a',
			]
		);

		$this->add_responsive_control(
			'link_btn_border_radius',
			[
				'label'      => esc_html__('Border Radius', 'ultimate-post-kit'),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => ['px', '%'],
				'selectors'  => [
					'{{WRAPPER}} .upk-banner-wrap .upk-buy-btn a' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'link_btn_padding',
			[
				'label'      => esc_html__('Padding', 'ultimate-post-kit'),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => ['px', 'em', '%'],
				'selectors'  => [
					'{{WRAPPER}} .upk-banner-wrap .upk-buy-btn a' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'link_btn_margin',
			[
				'label'      => esc_html__('Margin', 'ultimate-post-kit'),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => ['px', 'em', '%'],
				'selectors'  => [
					'{{WRAPPER}} .upk-banner-wrap .upk-buy-btn' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name'     => 'link_btn_shadow',
				'selector' => '{{WRAPPER}} .upk-banner-wrap .upk-buy-btn a',
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'link_btn_typography',
				'label'    => esc_html__('Typography', 'ultimate-post-kit'),
				'selector' => '{{WRAPPER}} .upk-banner-wrap .upk-buy-btn a',
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_link_btn_hover',
			[
				'label' => esc_html__('Hover', 'ultimate-post-kit'),
			]
		);

		$this->add_control(
			'link_btn_hover_color',
			[
				'label'     => esc_html__('Color', 'ultimate-post-kit'),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .upk-banner-wrap .upk-buy-btn a:hover' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Background::get_type(),
			[
				'name'      => 'link_btn_hover_background',
				'selector'  => '{{WRAPPER}} .upk-banner-wrap .upk-buy-btn a:hover',
			]
		);

		$this->add_control(
			'link_btn_hover_border_color',
			[
				'label'     => esc_html__('Border Color', 'ultimate-post-kit'),
				'type'      => Controls_Manager::COLOR,
				'condition' => [
					'link_btn_border_border!' => '',
				],
				'selectors' => [
					'{{WRAPPER}} .upk-banner-wrap .upk-buy-btn a:hover' => 'border-color: {{VALUE}};',
				],
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();


		$this->start_controls_section(
			'section_style_badge',
			[
				'label'     => esc_html__('Badge', 'ultimate-post-kit'),
				'tab'       => Controls_Manager::TAB_STYLE,

			]
		);


		$this->start_controls_tabs('tabs_badge_style');

		$this->start_controls_tab(
			'tab_badge_normal',
			[
				'label' => esc_html__('Badge', 'ultimate-post-kit'),
				'condition'	  => [
					'show_badge'	=> 'yes',
				],
			]
		);

		$this->add_control(
			'badge_color',
			[
				'label'     => esc_html__('Color', 'ultimate-post-kit'),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .upk-banner-wrap .upk-discount' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Background::get_type(),
			[
				'name'      => 'badge_background',
				'selector'  => '{{WRAPPER}} .upk-banner-wrap .upk-discount',
			]
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name'        => 'badge_border',
				'selector'    => '{{WRAPPER}} .upk-banner-wrap .upk-discount',
			]
		);

		$this->add_responsive_control(
			'badge_border_radius',
			[
				'label'      => esc_html__('Border Radius', 'ultimate-post-kit'),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => ['px', '%'],
				'selectors'  => [
					'{{WRAPPER}} .upk-banner-wrap .upk-discount' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'badge_padding',
			[
				'label'      => esc_html__('Padding', 'ultimate-post-kit'),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => ['px', 'em', '%'],
				'selectors'  => [
					'{{WRAPPER}} .upk-banner-wrap .upk-discount' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'badge_margin',
			[
				'label'      => esc_html__('Margin', 'ultimate-post-kit'),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => ['px', 'em', '%'],
				'selectors'  => [
					'{{WRAPPER}} .upk-banner-wrap .upk-discount' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name'     => 'badge_shadow',
				'selector' => '{{WRAPPER}} .upk-banner-wrap .upk-discount',
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'badge_typography',
				'label'    => esc_html__('Typography', 'ultimate-post-kit'),
				'selector' => '{{WRAPPER}} .upk-banner-wrap .upk-discount',
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_badge_banner_size',
			[
				'label' => esc_html__('Banner Size', 'ultimate-post-kit'),
			]
		);

		$this->add_control(
			'banner_size_color',
			[
				'label'     => esc_html__('Color', 'ultimate-post-kit'),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .upk-banner-wrap .upk-banner-size-text' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Background::get_type(),
			[
				'name'      => 'banner_size_background',
				'selector'  => '{{WRAPPER}} .upk-banner-wrap .upk-banner-size-text',
			]
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name'        => 'banner_size_border',
				'selector'    => '{{WRAPPER}} .upk-banner-wrap .upk-banner-size-text',
			]
		);

		$this->add_responsive_control(
			'banner_size_border_radius',
			[
				'label'      => esc_html__('Border Radius', 'ultimate-post-kit'),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => ['px', '%'],
				'selectors'  => [
					'{{WRAPPER}} .upk-banner-wrap .upk-banner-size-text' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'banner_size_padding',
			[
				'label'      => esc_html__('Padding', 'ultimate-post-kit'),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => ['px', 'em', '%'],
				'selectors'  => [
					'{{WRAPPER}} .upk-banner-wrap .upk-banner-size-text' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name'     => 'banner_size_shadow',
				'selector' => '{{WRAPPER}} .upk-banner-wrap .upk-banner-size-text',
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'banner_size_typography',
				'label'    => esc_html__('Typography', 'ultimate-post-kit'),
				'selector' => '{{WRAPPER}} .upk-banner-wrap .upk-banner-size-text',
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();

	}




	public function render_banner_content() {
		$settings  = $this->get_settings_for_display();

		$this->add_render_attribute('banner-title', 'class', 'upk-title');
		
		if ('yes' == $settings['title_link'] and $settings['title_link_url']['url']) {

			$target = $settings['title_link_url']['is_external'] ? '_blank' : '_self';

			$this->add_render_attribute('banner-title', 'onclick', "window.open('" . $settings['title_link_url']['url'] . "', '$target')");
		}

		$this->add_render_attribute( 'banner-sub-title', 'class', 'upk-sub-title' );

		$this->add_render_attribute( 'banner-badge', 'class', 'upk-discount' );

		$this->add_render_attribute( 'banner-size', 'class', 'upk-banner-size-text' );

		$this->add_render_attribute('description_text', 'class', 'upk-text');

		$this->add_inline_editing_attributes('title_text', 'none');
		
		$this->add_inline_editing_attributes('description_text');


		$this->add_render_attribute('readmore', 'class', ['bdt-banner-readmore']);

		if (!empty($settings['readmore_link']['url'])) {
			$this->add_render_attribute('readmore', 'href', $settings['readmore_link']['url']);

			if ($settings['readmore_link']['is_external']) {
				$this->add_render_attribute('readmore', 'target', '_blank');
			}

			if ($settings['readmore_link']['nofollow']) {
				$this->add_render_attribute('readmore', 'rel', 'nofollow');
			}
		}

		if ($settings['onclick']) {
			$this->add_render_attribute('readmore', 'onclick', $settings['onclick_event']);
		}

		if (!empty($settings['button_css_id'])) {
			$this->add_render_attribute('readmore', 'id', $settings['button_css_id']);
		}

	?>	

      <div class="upk-content">

		<div class="upk-content-inner">
			<?php if ($settings['title_text']) : ?>
				<<?php echo Utils::get_valid_html_tag($settings['title_size']); ?> <?php echo $this->get_render_attribute_string('banner-title'); ?>>
					<a href="#" <?php echo $this->get_render_attribute_string('title_text'); ?>>
						<?php echo wp_kses_post($settings['title_text'], ultimate_post_kit_title_tags('title')); ?>
					</a>
				</<?php echo Utils::get_valid_html_tag($settings['title_size']); ?>>
			<?php endif; ?>

			<?php if ('yes' == $settings['show_sub_title']) : ?>
				<div <?php echo $this->get_render_attribute_string('banner-sub-title'); ?>>
					<?php echo wp_kses($settings['sub_title_text'], ultimate_post_kit_title_tags('title')); ?>
				</div>
			<?php endif; ?>
		</div>

		<?php if ('yes' == $settings['show_text']) : ?>
			<div <?php echo $this->get_render_attribute_string('description_text'); ?>>
				<?php echo wp_kses($settings['description_text'], ultimate_post_kit_title_tags('text')); ?>
			</div>
		<?php endif; ?>

		<?php if ('yes' == $settings['show_badge']) : ?>
				<div <?php echo $this->get_render_attribute_string('banner-badge'); ?>>
					<?php echo wp_kses($settings['badge_text'], ultimate_post_kit_title_tags('title')); ?>
				</div>
		<?php endif; ?>

		<?php if ($settings['readmore']) : ?>
			<div class="upk-buy-btn">
				<a <?php echo $this->get_render_attribute_string('readmore'); ?>>
					<?php echo esc_html($settings['readmore_text']); ?>
					<?php if ($settings['advanced_readmore_icon']['value']) : ?>
						<span class="bdt-button-icon-align-<?php echo $settings['readmore_icon_align'] ?>">
							<?php Icons_Manager::render_icon($settings['advanced_readmore_icon'], ['aria-hidden' => 'true', 'class' => 'fa-fw']); ?>
						</span>
					<?php endif; ?>
				</a>
			</div>
		<?php endif ?>
		
	  </div>				
					
	  <?php if ('yes' == $settings['show_banner_size']) : ?>
				<div <?php echo $this->get_render_attribute_string('banner-size'); ?>>
					<span>
						<?php echo wp_kses($settings['banner_size_text'], ultimate_post_kit_title_tags('title')); ?>
					</span>
				</div>
		<?php endif; ?>

	<?php
	}


	public function render_animated_image() {
		$settings  = $this->get_settings_for_display();

		$thumb_url = Group_Control_Image_Size::get_attachment_image_src($settings['image']['id'], 'thumbnail_size', $settings);

		if (!$thumb_url) {
			$thumb_url = $settings['image']['url'];
		}
		?>
		<div class="upk-img-wrap">
			<img class="upk-img" src="<?php echo esc_url($thumb_url); ?>" alt="<?php echo esc_html($settings['title_text']); ?>">
		</div>

		<?php
	}



	protected function render() {
		$settings = $this->get_settings_for_display();

		$this->add_render_attribute('upk-banner', 'class', ['upk-banner-wrap ', 'upk-banner-' . $settings['layout_direction'] . '']);

	?>
		<div <?php echo $this->get_render_attribute_string('upk-banner'); ?>>

            <div class="upk-item">
			   <?php $this->render_animated_image(); ?>
				<?php $this->render_banner_content(); ?>
            </div>

        </div>

		<?php

	}
}
