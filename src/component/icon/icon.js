import React from 'react'

export function check_circle(props) {
    const className = "svg-inline--fa fa-check-circle fa-w-16 fa-9x "+props.className
    return(
        <svg aria-hidden="true" 
            focusable="false" 
            data-prefix="fal" 
            data-icon="check-circle" 
            role="img" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 512 512" 
            class={className} 
            style={props.style}><path fill="currentColor" d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" class=""></path></svg>)
}

export function circle_duotone(props) {
    return <svg aria-hidden="true" 
            focusable="false" 
            data-prefix="fad" 
            data-icon="circle" 
            role="img"
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 512 512" 
            style={props.style}
            class={"svg-inline--fa fa-circle fa-w-16 fa-9x "+props.className}>
                <g class="fa-group">
                    <path 
                        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 424c-97.06 0-176-79-176-176S158.94 80 256 80s176 79 176 176-78.94 176-176 176z" 
                        class="fa-secondary">
                    </path>
                    {/* <path fill="currentColor" 
                        d="M256 432c-97.06 0-176-79-176-176S158.94 80 256 80s176 79 176 176-78.94 176-176 176z" 
                        class="fa-primary">
                    </path> */}
                </g>
            </svg>
}

export function circle_minus(props){
    return <svg aria-hidden="true" 
                focusable="false" 
                data-prefix="fal" 
                data-icon="minus-circle" 
                role="img" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 512 512"
                style={props.style} 
                class={"svg-inline--fa fa-minus-circle fa-w-16 fa-9x "+props.className}>
                    <path fill="currentColor" 
                        d="M140 274c-6.6 0-12-5.4-12-12v-12c0-6.6 5.4-12 12-12h232c6.6 0 12 5.4 12 12v12c0 6.6-5.4 12-12 12H140zm364-18c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-32 0c0-119.9-97.3-216-216-216-119.9 0-216 97.3-216 216 0 119.9 97.3 216 216 216 119.9 0 216-97.3 216-216z" 
                        class="">
                    </path>
            </svg>
}

export function no_filter(props){
    return <svg 
                aria-hidden="true" 
                focusable="false" 
                data-prefix="fas" 
                data-icon="filter" 
                class="svg-inline--fa fa-filter fa-w-16 second-font-color" 
                role="img" 
                viewBox="0 0 512 512" 
                style={props.style}>
                    <path
                        d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z">
                    </path>
                    <line x1="0" y1="0" x2="200" y2="200" style={{stroke: "rgb(255,0,0)", strokeWidth: "2"}}/>
                    {/* <path
                        d="M256 432c-97.06 0-176-79-176-176S158.94 80 256 80s176 79 176 176-78.94 176-176 176z" 
                        class="fa-primary">
                    </path> */}
            </svg>
}

export function square_light(props){
    return <svg aria-hidden="true" 
            focusable="false" 
            data-prefix="fal" 
            data-icon="square" 
            role="img" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 448 512"
            style={props.style} 
            class="svg-inline--fa fa-square fa-w-14 fa-3x sqr-mn">
                <path 
                    fill="currentColor" 
                    d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm16 400c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v352z" class="">
                </path>
            </svg>
}