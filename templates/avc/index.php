<?php
defined( '_JEXEC' ) or die( 'Restricted access' );
$document =& JFactory::getDocument();
$document->setTitle($document->getTitle().' | '.$mainframe->getCfg('sitename'));
$user = JFactory::getUser();
if ($user->get('guest') == 1 or $user->usertype == 'Registered') {
    $headerstuff = $this->getHeadData();   
    $tmp = array();
    foreach ($headerstuff['scripts'] as $path=>$type) {
         if ( !preg_match('#media/system/js#i', $path, $ar) ) $tmp[$path] = $type;
    }
    $headerstuff['scripts'] = $tmp;
    $this->setHeadData($headerstuff);
}
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:jdoc="http://www.w3.org/2001/XMLSchema"
      xml:lang="<?php echo $this->language; ?>" lang="<?php echo $this->language; ?>">
<head>
<?php
$headlink = $this->getHeadData();
	unset($headlink['scripts']['/includes/js/joomla.javascript.js']);
	unset($headlink['scripts']['/media/system/js/mootools.js']);
	unset($headlink['scripts']['/media/system/js/caption.js']);
$this->setHeadData($headlink);
?>
<jdoc:include type="head" />  <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/avc/css/styles.css" type="text/css" />
  <!--<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/avc/js/jquery.min.js"></script>-->
  <!--jquery-1.10.2.min insert by 4xtrot-->
  <script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/avc/js/jquery-1.10.2.min.js"></script>
  <script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/avc/js/jquery.jplayer.min.js"></script>
  <script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/avc/js/slimbox_<?php echo JText::_('SLIMBOX_LANG'); ?>.js"></script>
  <script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/avc/js/jquery.easing.1.3.min.js"></script>
  <script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/avc/js/scripts.js"></script>
  <script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/avc/js/jquery-ui.js"></script>
  <script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/avc/js/sprite_animation.js"></script>
  <!-- Fotorama. Insert by 4xtrot-->
        <link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/avc/css/fotorama.css" type="text/css" />
	<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/avc/js/fotorama.js"></script>
  <script type="text/javascript">
     jQuery(function () {
         if (BrowserDetect.browser === 'Explorer' && BrowserDetect.version <= 6) {
         window.location.replace("/noiesix");
	     }
    });
  </script>
  <script type="text/javascript">
  $(document).ready(function(){

    var tempWindow = jQuery('.firstload');
    var autoplay = jQuery.cookie('autoplay');
    var myWindowTemp = jQuery.cookie('myWindowTemp');

    if (!myWindowTemp) {
        jQuery('.firstload, #fader_temp').show()
    } else {
        jQuery.cookie('myWindowTemp', '1', { expires:365 });
    }

    jQuery('#btnNO, #btnYES, .close_bttn_temp, #fader_temp').click(function () {
        if (jQuery(this).attr("id") === 'btnYES') {
			$("#jquery_jplayer_1").jPlayer("play");
			jQuery.cookie('autoplay', '1', { expires:365 });
        } else {
			jQuery.cookie('autoplay', '0', { expires:365 });
		}
        jQuery.cookie('myWindowTemp', '1', { expires:365 });
        tempWindow.fadeOut(500);
        jQuery("#fader_temp").fadeOut(500);
    });
	
	jQuery('a.jp-stop').click(function() {
		jQuery.cookie('autoplay', '0', { expires:365 });
	});
	
	jQuery('a.jp-play').click(function() {
		jQuery.cookie('autoplay', '1', { expires:365 });
	});
	
	$("#jquery_jplayer_1").jPlayer({
		ready: function () {
			if (autoplay == 1) {
				$(this).jPlayer("setMedia", {
					m4a:"/music/melody.m4a",
					oga:"/music/melody.ogg"
				}) .jPlayer("play");
			} else {
				$(this).jPlayer("setMedia", {
				m4a:"/music/melody.m4a",
				oga:"/music/melody.ogg"
			});
			}
		}, 
		swfPath: "js",
		supplied: "m4a, oga"
	});
  });
  </script>
<!--[if IE 8]>
<link rel="stylesheet" type="text/css" href="templates/avc/css/ie8.css"/>
<![endif]-->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<?php 
	$Itemid = JRequest::getInt( 'Itemid', 1, 'get' );
	$option = JRequest::getVar('option', null); 
	$view = JRequest::getVar('view', null); 
	$document = & JFactory::getDocument();
	$user = & JFactory::getUser();
?>	
<?php if ($Itemid == '4') { ?>
<body id="home">
<?php } else { ?>
<body>
<?php } ?>

<div id="mainheader">
    <div id="mainheader1">
    </div>
    <div id="mainheader2">   <!-- при удалении - удалить и стиль этого id -->
    </div>
    <div id="mainheader3">
    </div>
</div>
<div id="mainbody">

    <div id="container">

    <!--
    <div id="loading" style="display: none;"></div>
	<div id="loader" style="display: none;">
        <div class="container" style="display: none;">
            <div id="sprite" style="display: none;"></div>
        </div>
    </div>
    <div id="logo_shade" style="display: none;"></div>
    -->
<?php $menu = & JSite::getMenu();
	if ($menu->getActive() != $menu->getDefault()) { ?>
	<div id="header">
    	<div id="top_line">
        	<div>
            	<jdoc:include type="modules" name="header" />
                <?php if ($this->countModules('slidebox')) {  
					if ($Itemid == '4') { ?>
						<div id="logo_box_slide"><span title="AVC Charity" id="logo">&nbsp;</span></div>
					<?php } else { ?>
						<div id="logo_box_slide"><a href="about-avc-charity" title="На главную AVC Charity" id="logo"></a></div>
					<?php } 
				} else { 
                	if ($Itemid == '4') { ?>
						<div id="logo_box"><span title="AVC Charity" id="logo">&nbsp;</span></div>
					<?php } else { ?>
						<div id="logo_box"><a href="about-avc-charity" title="На главную AVC Charity" id="logo"></a></div>
					<?php }
                } ?>
            </div>
        </div>
        <div id="menu_box">
        	<jdoc:include type="modules" name="menu" />
        </div>
       <jdoc:include type="modules" name="slidebox" />
    </div>
    <div id="wrapper">
<?php if ($Itemid != '4') {
    if ($this->countModules('slidebox')) { /*показываем slidebox (фото с пианино под меню)*/
		if ($this->countModules('sidebar')) { ?>
        	<!--в оригинале надо в id убрать "_2"-->
            <div id="content_side_2">
                <div id="content_box_2"><jdoc:include type="component" /></div>
            </div>
            <div id="sidebar_2"><jdoc:include type="modules" name="sidebar" /></div>
   		<?php } else { ?>
           	<div id="content_full"><jdoc:include type="component" /></div>
		<?php }
    } else { 
		if ($this->countModules('sidebar')) { /*не показываем slidebox*/?>
        	<!--<div id="content_side">-->
            <div id="content_side_2">
                <div id="content_box_2"><jdoc:include type="component" /></div>
            </div>
            <div id="sidebar_2"><jdoc:include type="modules" name="sidebar" /></div>
		<?php } else { ?>
        	<div id="content"><jdoc:include type="component" /></div>
        <?php }
    }
}else { ?>
    <div id="content_home"><jdoc:include type="component" /></div>
    <jdoc:include type="modules" name="slideshow" />
<?php }
} else { ?>
    <jdoc:include type="modules" name="slidebox" />
<?php } ?>
	</div>
</div>
<?php $menu = & JSite::getMenu();
			if ($menu->getActive() != $menu->getDefault()) { ?>
<div id="footer">
	<div id="footer_line">
		<jdoc:include type="modules" name="footer_line" />
    </div>
    <div id="copyrights">
    	<jdoc:include type="modules" name="footer" />
		<!--<a href="http://www.outmind.com" id="od_logo" title="Made by Outmind Design Studio" target="_blank"></a>-->
    </div>
</div>
<jdoc:include type="message" />
<jdoc:include type="modules" name="message" />
<div id="fader"></div> <?php } ?>

</div>
<div id="mainfooter">
    <div id="mainfooter1"></div>
    <div id="mainfooter2"></div>
</div>

</body>
</html>