
import { Component,Directive, ElementRef, HostListener, Input } from '@angular/core';
declare var d3plus:any;

@Component({
    selector: 'hello-world',
    styles: [`
       h1 {
            color: blue;
        }
    `],
    template: `<div>
                  <h1 (click)="onClick()">{{message}}</h1>
               </div>`
})
export class BaseChart {
  public viz: any;
  public container: any;
  public attributes: any;

  @Input('color') color: string;
  @Input('cols') cols: string;
  @Input('depth') highlightColor: string;
  @Input('nodes') nodes: string;
  @Input('edges') edges: string;
  @Input('focus') focus: string;
  @Input('id') id: string;
  @Input('shape') shape: string;
  @Input('size') size: string;
  @Input('time') time: string;
  @Input('x') x: string;
  @Input('y') y: string;
  @Input('coords') coords: string;
  @Input('tooltip') tooltip: string;

  myid( $element:any) {
      var name;
      if (this.container) name = this.container;
      else if ($element) name = '#' + $element[0].children[0].id;
      else if (this.viz) name = this.viz.container();
      return name;
  }

  template($scope:any) {
      var divid;
      if (!$scope.container) {
          divid = 'd3plus-' + new Date().getTime() + Math.floor((Math.random() * 10) + 1);
          $scope.container = '#' + divid;
          if ($scope.length > 0) $scope[0].container = $scope.container;
      }
      var style = '';
      if ($scope[0].attributes['style'])
          style = $scope[0].attributes['style'].nodeValue;
      return '<div id="' + divid + '" style="' + style + '"></div>';
  }

  link($scope:any, $element:any, $attrs:any) {
      $scope.$watch('data', function(data:any) {
          if (data && data.length > 0) {
              $scope.viz.data(data).draw();
          }
      });
      $scope.$on('DataReady', function(event:any, args:any) {
          if (args.elementid === $scope.elementid) {
              if (args.data && args.data.length > 0) $scope.viz.data(args.data);
              if (args.nodes) $scope.viz.nodes(args.nodes);
              if (args.edges) {
                $scope.viz.edges(args.edges);
                if(args.edgesarrows) $scope.viz.edges({'arrows': args.edgesarrows});
              }
              $scope.viz.draw();
          }
      });
  }

  controller($scope:any, $element:any, type:any) {
      $scope.viz = d3plus.viz().container(this.myid($element));
      if (this.attributes.color) this.setvar(this.viz.color, this.attributes.color);
      if (this.attributes.cols) this.setvar(this.viz.cols, this.attributes.cols);
      if (this.attributes.depth) $scope.viz.depth(Math.round(this.attributes.depth));
      if (this.attributes.nodes) this.setvar(this.viz.nodes, this.attributes.nodes);
      if (this.attributes.edges) this.setvar(this.viz.edges, this.attributes.edges);
      if (this.attributes.focus) this.setvar(this.viz.focus, this.attributes.focus);
      if (this.attributes.id) this.setvar(this.viz.id, this.attributes.id);
      if (this.attributes.shape) this.setvar(this.viz.shape, this.attributes.shape);
      if (this.attributes.size) this.setvar(this.viz.size, this.attributes.size);
      if (this.attributes.time) this.setvar(this.viz.time, this.attributes.time);
      if (this.attributes.x) this.setvar(this.viz.x, this.attributes.x);
      if (this.attributes.y) this.setvar(this.viz.y, this.attributes.y);
      if (this.attributes.coords) this.setvar(this.viz.coords, this.attributes.coords);
      if (this.attributes.tooltip) this.setvar(this.viz.tooltip, this.attributes.tooltip);
      $scope.viz.type(type);
  }

  scope(typescope:any) {
      typescope.data = '=';
      typescope.container = '@?';
      typescope.style = '@?';
      typescope.focus = '@?';
      typescope.tooltip = '@?';
      typescope.elementid = '@?';
      typescope.config = '@?';
      return typescope;
  }

  setvar(func:any, val:any) {
      try {
          var parsed = JSON.parse(val);
          if (parsed) func(parsed);
          else func(val);
      } catch (e) {
          func(val);
      }
  }

}
