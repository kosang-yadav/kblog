import {Logo} from "../index"
import { Link } from "react-router-dom"

export default function Footer() {
    return (
      <section className="relative overflow-hidden mx-1 py-10 bg-black border border-t-2 border-t-black text-center">
              <div className="relative z-10 mx-auto max-w-7xl px-4">
                  <div className="-m-6 flex flex-wrap">
                      <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                          <div className="flex h-full flex-col justify-between items-center lg:items-start">
                              <div className="mb-4 inline-flex grow items-center hidden md:block">
                                  <Logo />
                              </div>
                              <div>
                                  <p className="text-sm text-white w-max">
                                      &copy; Copyright 2027. All Rights Reserved by <strong className="text-lg text-red-500">BaKa...</strong>
                                  </p>
                              </div>
                          </div>
                      </div>
                      <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                          <div className="h-full">
                              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-600">
                                  Company
                              </h3>
                              <ul>
                                  <li className="mb-4">
                                      <Link
                                          className=" text-base font-medium text-white hover:text-gray-800"
                                          to="/"
                                      >
                                          Features
                                      </Link>
                                  </li>
                                  <li className="mb-4">
                                      <Link
                                          className=" text-base font-medium text-white hover:text-gray-700"
                                          to="/"
                                      >
                                          Pricing
                                      </Link>
                                  </li>
                                  <li className="mb-4">
                                      <Link
                                          className=" text-base font-medium text-white hover:text-gray-700"
                                          to="/"
                                      >
                                          Affiliate Program
                                      </Link>
                                  </li>
                                  <li>
                                      <Link
                                          className=" text-base font-medium text-white hover:text-gray-700"
                                          to="/"
                                      >
                                          Press Kit
                                      </Link>
                                  </li>
                              </ul>
                          </div>
                      </div>
                      <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                          <div className="h-full">
                              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-600">
                                  Support
                              </h3>
                              <ul>
                                  <li className="mb-4">
                                      <Link
                                          className=" text-base font-medium text-white hover:text-gray-700"
                                          to="/"
                                      >
                                          Account
                                      </Link>
                                  </li>
                                  <li className="mb-4">
                                      <Link
                                          className=" text-base font-medium text-white hover:text-gray-700"
                                          to="/"
                                      >
                                          Help
                                      </Link>
                                  </li>
                                  <li className="mb-4">
                                      <Link
                                          className=" text-base font-medium text-white hover:text-gray-700"
                                          to="/"
                                      >
                                          Contact Us
                                      </Link>
                                  </li>
                                  <li>
                                      <Link
                                          className=" text-base font-medium text-white hover:text-gray-700"
                                          to="/"
                                      >
                                          Customer Support
                                      </Link>
                                  </li>
                              </ul>
                          </div>
                      </div>
                      <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                          <div className="h-full">
                              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-600">
                                  Legals
                              </h3>
                              <ul>
                                  <li className="mb-4">
                                      <Link
                                          className=" text-base font-medium text-white hover:text-gray-700"
                                          to="/"
                                      >
                                          Terms &amp; Conditions
                                      </Link>
                                  </li>
                                  <li className="mb-4">
                                      <Link
                                          className=" text-base font-medium text-white hover:text-gray-700"
                                          to="/"
                                      >
                                          Privacy Policy
                                      </Link>
                                  </li>
                                  <li>
                                      <Link
                                          className=" text-base font-medium text-white hover:text-gray-700"
                                          to="/"
                                      >
                                          Licensing
                                      </Link>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
    )
  }