import {
    Component,
    AfterViewInit,
    Input,
    ElementRef,
    ViewChild,
    ViewChildren,
    QueryList,
    ViewEncapsulation,
    OnInit,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as d3 from 'd3';

@Component({
    selector: 'd3-tree',
    template: `
    <span #label *ngFor="let label of labels" class='fade'>{{label}}</span>
    <div #wrapper id="tree" [attr.data-size]="size$ | async " class="wrapper"><svg></svg></div>
    
    `,
    styles: [
        `d3-tree .wrapper{
      position:relative;
      max-width:960px;
      margin-left:auto;
      margin-right:auto;
      text-align:center;
    }
    d3-tree .fade{
      display:inline-block;
      border:1px solid black;
      position:absolute;
      padding:0 0.25rem;
      visibility:hidden;
    }
    d3-tree .node circle {
      stroke-width: var(--circle-stroke-width,1px);
      stroke: var(--circle-stroke,steelblue);;
    }
    d3-tree .node.fill {
      fill: var(--circle-fill,lightsteelblue);;
    }
    
    d3-tree .link {
      stroke:var(--stroke-link,#ccc);
      stroke-width: var(--stroke-width-link,1px);
    }
    d3-tree .node text,d3-tree .fade {
      font-family: sans-serif;
      font-size: .675em;
    }
    d3-tree .node circle {
      fill: var(--circle-empty,white);
    }
    
    d3-tree .link {
      fill: none;
    }
    
    @media (min-width: 400px) {
      d3-tree .node text,d3-tree .fade {
        font-size: .75em;
      }
    }
    @media (min-width: 600px) {
      d3-tree .node text,d3-tree .fade {
        font-size: .875em;
      }
    }
    
  `,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class D3Tree implements OnInit {
    @Input() treeData: any;

    get getTreeData() {
        return this._treeData;
    }

    @Input() duration = 750;

    @ViewChildren('label') labelsDiv: QueryList<ElementRef>;
    @ViewChild('wrapper', { static: true }) wrapper: ElementRef;
    @Input('max-height') set __(value: number) {
        this.maxHeight = value;
    }
    @Input('aspect-ratio') set _(value: number | string) {
        const split = ('' + value).split(':');
        this.factor = +split[1] / +split[0];
    }

    _treeData: any;

    maxHeight: number = 0;
    width: number;
    height: number = 0;
    factor: number = 0;
    svg: any;
    root: any;

    maxDepth: number = 0;
    labels: string[] = [];
    margin = { right: 100, left: 100 };

    i = 0;
    treemap: any;
    firstLabel: any;
    lastLabel: any;
    size$ = fromEvent(window, 'resize').pipe(
        map((_) => window.innerWidth),
        tap((_) => {
            this.updateSize();
            this.update(this.root);
        })
    );

    constructor() { }
    ngOnInit(): void {
        this.resetData(false);
    }
    ngOnChanges() {
        console.log('::change::' + this.treeData.children.length);
        this.resetData(true);
    }
    resetData(needToDraw: boolean) {
        this._treeData = this.treeData;
        this.maxDepth = this.depthOfTree(this._treeData);
        if (needToDraw) {

            this.drawTree();
        }
    }
    ngAfterViewInit(): void {
        this.drawTree();
    }
    drawTree() {
        if(!this.labelsDiv){
            return;
        }
        this.firstLabel = this.labelsDiv.first.nativeElement;
        this.labelsDiv.forEach((x) => {
            this.lastLabel = !this.lastLabel
                ? x.nativeElement
                : this.lastLabel.getBoundingClientRect().width <
                    x.nativeElement.getBoundingClientRect()
                    ? x.nativeElement
                    : this.lastLabel;
        });
        this.svg = d3.select('#tree').select('svg');
        this.svg.attr('preserveAspectRatio', 'xMidYMid meet').append('g');

        // declares a tree layout and assigns the size
        this.treemap = d3.tree().size([100, 100]);

        // Assigns parent, children, height, depth
        console.log(':: json:: ' + this.treeData.children.length);
        this.root = d3.hierarchy(this.treeData, (d: any) => {
            return d.children;
        });
        this.updateSize();
        setTimeout(() => {
            this.updateSize();
            if (this.root.children) {
                this.root.children.forEach((d: any) => {
                    this.collapse(d);
                });
            }
            this.update(this.root);
        });
    }
    depthOfTree(ptr: any, maxdepth: number = 0) {
        if (ptr == null || !ptr.children) return maxdepth;
        this.labels.push(ptr.name);
        for (let it of ptr.children)
            maxdepth = Math.max(maxdepth, this.depthOfTree(it));

        return maxdepth + 1;
    }
    updateSize() {
        this.margin.left = this.firstLabel.getBoundingClientRect().width + 13;
        this.margin.right = this.lastLabel.getBoundingClientRect().width + 33;
        this.width = this.wrapper.nativeElement.getBoundingClientRect().width;
        if (this.factor)
            this.height =
                this.width * this.factor < this.maxHeight
                    ? this.width * this.factor
                    : this.maxHeight;
        else this.height = this.maxHeight;

        this.svg
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .attr('width', this.width + 'px')
            .attr('height', this.height + 'px')
            .attr(
                'viewBox',
                '-' + this.margin.left + ' 0 ' + this.width + ' ' + this.height
            );
    }
    update(source: any) {
        // Assigns the x and y position for the nodes
        const treeData = this.treemap(this.root);

        // Compute the new tree layout.
        const nodes = treeData.descendants();
        const links = treeData.descendants().slice(1);

        let step =
            (this.width - this.margin.left - this.margin.right) / this.maxDepth;
        let innerMargin = 0;
        if (step > this.lastLabel.getBoundingClientRect().width + 100) {
            step = this.lastLabel.getBoundingClientRect().width + 100;
            innerMargin =
                (this.width -
                    step * this.maxDepth -
                    this.margin.left -
                    this.margin.right -
                    10) /
                2;
        }
        this.root.x0 = this.height / 2;
        this.root.y0 = 0;
        // Normalize for fixed-depth.
        nodes.forEach((d: any) => {
            d.y = d.depth * step + innerMargin;
            d.x = this.height / 2 + ((d.x - 50) * this.height) / 100;
        });
        // ****************** Nodes section ***************************

        // Update the nodes...
        const node = this.svg.selectAll('g.node').data(nodes, (d: any) => {
            return d.id || (d.id = ++this.i);
        });

        // Enter any new modes at the parent's previous position.
        const nodeEnter = node
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', (d: any) => {
                return 'translate(' + source.y0 + ',' + source.x0 + ')';
            })
            .on('click', (_: any, d: any) => this.click(d));

        // Add Circle for the nodes
        nodeEnter
            .append('circle')
            
            .attr('class', (d: any) => (d._children ? 'node fill' : 'node'))
            .attr('data-tooltip', 'sample')
            .attr('r', 1e-6);
        // Add labels for the nodes
        nodeEnter
            .append('text')
            .attr('text-rendering', 'optimizeLegibility')
            .attr('dy', '.35em')

            // .attr('cursor', ((d:any) => (d.children || d._children ? 'pointer' : 'auto'))
            .attr('x', (d: any) => {
                return d.children || d._children ? -13 : 13;
            })
            .attr('text-anchor', (d: any) => {
                return d.children || d._children ? 'end' : 'start';
            })
            .text((d: any) => {
                return d.data.name;
            });
        // UPDATE
        const nodeUpdate = nodeEnter.merge(node);

        // Transition to the proper position for the node
        nodeUpdate
            .transition()
            .duration(this.duration)
            .attr('transform', (d: any) => {
                return 'translate(' + d.y + ',' + d.x + ')';
            });

        // Update the node attributes and style
        nodeUpdate
            .select('circle.node')
            .attr('r', 10)
            .attr('class', (d: any) => (d._children ? 'node fill' : 'node'))
            .attr('cursor', (d: any) => (d.children || d._children ? 'pointer' : 'auto'));

        // Remove any exiting nodes
        const nodeExit = node
            .exit()
            .transition()
            .duration(this.duration)
            .attr('transform', (d: any) => {
                return 'translate(' + source.y + ',' + source.x + ')';
            })
            .remove();

        // On exit reduce the node circles size to 0
        nodeExit.select('circle').attr('r', 1e-6);

        // On exit reduce the opacity of text labels
        nodeExit.select('text').style('fill-opacity', 1e-6);

        // ****************** links section ***************************

        // Update the links...
        const link = this.svg.selectAll('path.link').data(links, (d: any) => {
            return d.id;
        });

        // Enter any new links at the parent's previous position.
        const linkEnter = link
            .enter()
            .insert('path', 'g')
            .attr('class', 'link')
            .attr('d', (d: any) => {
                const o = { x: source.x0, y: source.y0 };
                return this.diagonal(o, o);
            });

        // UPDATE
        const linkUpdate = linkEnter.merge(link);

        // Transition back to the parent element position
        linkUpdate
            .transition()
            .duration(this.duration)
            .attr('d', (d: any) => {
                return this.diagonal(d, d.parent);
            });

        // Remove any exiting links
        const linkExit = link
            .exit()
            .transition()
            .duration(this.duration)
            .attr('d', (d: any) => {
                const o = { x: source.x, y: source.y };
                return this.diagonal(o, o);
            })
            .remove();

        // Store the old positions for transition.
        nodes.forEach((d: any) => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    collapse(d: any) {
        if (d.children) {
            d._children = d.children;
            d._children.forEach((d: any) => this.collapse(d));
            d.children = null;
        }
    }

    click(d: any) {
        console.log('click::'+ d);
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        setTimeout(() => {
            this.update(d);
        });
    }

    diagonal(s: any, d: any) {
        const path = `M ${s.y} ${s.x}
              C ${(s.y + d.y) / 2} ${s.x},
                ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`;

        return path;
    }
}
