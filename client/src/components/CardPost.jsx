import React from 'react'

const CardPost = ({post}) => {
    return (
        <div className="flex flex-col justify-center">
            <div className="flex flex-col h-full bg-card dark:bg-card-dark shadow justify-between rounded-lg pb-8 p-6 xl:p-8 mt-3 bg-gray-50">
                <div>
                    <h4 className="font-bold text-2xl leading-tight"> {post.title} </h4>
                    <div className="my-4">
                        <p> {post.content} </p>
                    </div>
                </div>
                <div>
                    <a className="mt-1 inline-flex font-bold items-center border-2 border-transparent outline-none focus:ring-1 focus:ring-offset-2 focus:ring-link active:bg-link active:text-gray-700 active:ring-0 active:ring-offset-0 leading-normal bg-link text-gray-700 hover:bg-opacity-80 text-base rounded-lg py-1.5"
                        aria-label="Quick Start" target="_self" href="/learn">
                        Read More
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                            className="duration-100 ease-in transition -rotate-90 inline ml-1"
                            style={{ minWidth: '20px', minHeight: '20px' }}>
                            <g fill="none" fillRule="evenodd" transform="translate(-446 -398)">
                                <path fill="currentColor" fillRule="nonzero"
                                    d="M95.8838835,240.366117 C95.3957281,239.877961 94.6042719,239.877961 94.1161165,240.366117 C93.6279612,240.854272 93.6279612,241.645728 94.1161165,242.133883 L98.6161165,246.633883 C99.1042719,247.122039 99.8957281,247.122039 100.383883,246.633883 L104.883883,242.133883 C105.372039,241.645728 105.372039,240.854272 104.883883,240.366117 C104.395728,239.877961 103.604272,239.877961 103.116117,240.366117 L99.5,243.982233 L95.8838835,240.366117 Z"
                                    transform="translate(356.5 164.5)"></path>
                                <polygon points="446 418 466 418 466 398 446 398"></polygon>
                            </g>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default CardPost