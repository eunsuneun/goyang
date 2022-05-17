$(function () {
  header();
  slickSlider();
  bookmarkTab();
});

const header = () => {
  // 햄버거 아이콘 클릭
  $(".hamburger-wrap").on("click", function () {
    $("body").addClass("open");
    $(".lnb-menu .dp1").eq(0).addClass("on");
  });

  // top-menu > util-area 메뉴 클릭
  $(".util-area li dt a").on("click", function () {
    const idx = $(this).parent().parent().parent().index();
    $(".util-area li").eq(idx).toggleClass("open");
  });

  // lnb 닫기 아이콘 클릭
  $(".util-area .close-btn button").on("click", function () {
    $("body").removeClass("open");
  });
  $("body::after").on("click", function () {
    $("body").removeClass("open");
  });

  // lnb 메뉴 depth1 클릭
  $(".lnb-menu .dp1 > a").on("click", function (e) {
    const windowWidth = $(window).width();
    const idx = $(this).parent().index();
    if (windowWidth < 993) {
      e.preventDefault();
      $(".lnb-menu .dp1").removeClass("on");
      $(".lnb-menu .dp1").eq(idx).toggleClass("on");
    }
  });

  // lnb 메뉴 depth2 클릭
  $(".lnb-menu .dp2 > a").on("click", function (e) {
    const windowWidth = $(window).width();
    const dp1Idx = $(this).parent().parent().parent().index();
    const dp2Idx = $(this).parent().index();
    if (windowWidth < 993) {
      e.preventDefault();
      $(".lnb-menu .dp1").eq(dp1Idx).find(".dp2").eq(dp2Idx).toggleClass("on");
    }
  });
};

const slickSlider = () => {
  $(".visual-wrap .slide-list").slick({
    autoplay: true,
  });
  $(".news-wrap .slide-list").slick({
    autoplay: true,
  });
};

const bookmarkTab = () => {
  $(".bookmark-wrap .tab-list li a").on("click", function () {
    const idx = $(this).parent().index();
    $(".bookmark-wrap .tab-list li").removeClass("on");
    $(this).parent().addClass("on");
    $(".bookmark-wrap .tab-cont-list").removeClass("on");
    $(".bookmark-wrap .tab-cont-list").eq(idx).addClass("on");
  });
};
