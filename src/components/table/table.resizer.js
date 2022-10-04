import { $ } from "../../core/dom";

export function tableResHandler($root, e) {
  return new Promise((res) => {
    const $resizer = $(e.target);
    const $parent = $resizer.closest(`[data-type = "resizeble"]`);
    const cords = $parent.getCords();
    const type = e.target.dataset.resize;
    const $highliter = $.create("div", "resize-highliter");
    $parent.append($highliter);

    if (type === "col") {
      let idx = Number.parseInt($parent.dataset.col);
      const cells = $root.getAll(`.cell[data-col-idx="${idx}"]`);
      let value;
      $highliter.css({
        position: "absolute",
        top: "0",
        right: "-1px",
        width: "1px",
        "z-index": 3,
        height: "100vh",
        "background-color": "rgba(66, 177, 255, 0.4)",
      });

      document.onmousemove = (moveEvent) => {
        const delta = moveEvent.pageX - cords.right;
        value = cords.width + delta;
        const highliterPos = value - cords.width;
        if (highliterPos >= 0) {
          $highliter.css({ width: delta + "px", right: -delta + "px" });
        } else {
          $highliter.css({ width: -delta + "px", right: 0 });
        }
      };

      document.onmouseup = () => {
        $highliter.remove();
        $parent.css({ width: value + "px" });
        cells.forEach((item) => item.css({ width: value + "px" }));
        document.onmousemove = null;
        document.onmouseup = null;
        res({ value, id: $parent.dataset.col, type: "col" });
      };
    }

    if (type === "row") {
      let value;
      $highliter.css({
        position: "absolute",
        bottom: "-1px",
        left: "0",
        width: "100vw",
        "z-index": 3,
        height: "1px",
        "background-color": "rgba(66, 177, 255, 0.4)",
      });

      document.onmousemove = (moveEvent) => {
        const delta = moveEvent.pageY - cords.bottom;
        value = cords.height + delta - window.scrollY;
        const highliterPos = value - cords.height;
        if (highliterPos <= 0) {
          $highliter.css({
            height: -delta + window.scrollY + "px",
            bottom: "0px",
          });
        } else {
          $highliter.css({
            height: delta - window.scrollY + "px",
            bottom: -delta + window.scrollY + "px",
          });
        }
      };
      document.onmouseup = () => {
        $highliter.remove();
        $parent.css({ height: value + "px" });
        res({ id: $parent.dataset.row, value, type: "row" });
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  });
}
