<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */
// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'europeanyogaorg' );
/** Database username */
define( 'DB_USER', 'root' );
/** Database password */
define( 'DB_PASSWORD', 'root' );
/** Database hostname */
define( 'DB_HOST', 'localhost' );
/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );
/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );
/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '^_8jKQh}5UW!eLYgQYg}(,}^M)AAuG,)il-~mNE-KM/7e8aT^n$}SRrsT1mAW;m*' );
define( 'SECURE_AUTH_KEY',  '#m,&%95F7?}:t:__dAoo2HfR~%u[*ha%qaQPaS_,N~3KZR#vl1b$djIC(tav|<u;' );
define( 'LOGGED_IN_KEY',    '~$=S;yQ_J:|:e>a=%(xRHdIV^8&JR2DdC+4LG6an{Si7n~bz]XF.Z$dLmzlN||@$' );
define( 'NONCE_KEY',        ')L=US8TLY^D)7cNcQbc+XB5g}u$.)n{d`x9=^O~$d+Y6siRzX<SB yQP=V)T~7?8' );
define( 'AUTH_SALT',        ' 9p=w.rw^4w}C@z|SkQWcY4rs[^Ao(^wwyGD T71u$/*Pvkv#C!$6,]_|0`H<N{`' );
define( 'SECURE_AUTH_SALT', ']76ebLEj50.c@pOr9>j4YTu,ENMCe:c2_TPb!aE,P/Goy8nlt.ZMjXs`Vqp^pQgd' );
define( 'LOGGED_IN_SALT',   '/&v/)1nO<w}J?a+oFBHR}+g-^hH24W=a3!dbb }9q^:q~R&.7*]>9hSr#z|=i_AA' );
define( 'NONCE_SALT',       'P&|TL3m/Lg~gs#*[hyMZ<!w<1n~jt~FQD&8 U9:TnE#I}hiGpk;`~@yIO^umrEFX' );
/**#@-*/
/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';
/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );
define('WP_MEMORY_LIMIT', '512M');
/* Add any custom values between this line and the "stop editing" line. */
/* That's all, stop editing! Happy publishing. */
/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}
/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';