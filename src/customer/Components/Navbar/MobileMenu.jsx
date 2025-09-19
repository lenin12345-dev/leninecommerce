import { Fragment } from "react";
import { Dialog, Transition, Tab } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { navigation } from "../../../config/navigationMenu";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MobileMenu({ open, setOpen, auth, onLogout }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
        <Transition.Child as={Fragment} enter="transition-opacity duration-300" leave="transition-opacity duration-300">
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition duration-300 transform"
            leave="transition duration-300 transform"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col bg-white shadow-lg">
              <div className="flex justify-end p-4">
                <button onClick={() => setOpen(false)}>
                  <XMarkIcon className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              {/* Category Tabs */}
              <Tab.Group>
                <Tab.List className="flex space-x-4 border-b px-4">
                  {navigation.categories.map((cat) => (
                    <Tab
                      key={cat.name}
                      className={({ selected }) =>
                        classNames(
                          selected ? "border-teal-600 text-teal-600" : "border-transparent text-gray-900",
                          "flex-1 border-b-2 py-2 text-base"
                        )
                      }
                    >
                      {cat.name}
                    </Tab>
                  ))}
                </Tab.List>
              </Tab.Group>

              {/* User Actions */}
              <div className="border-t px-4 py-6">
                {auth.user ? (
                  <>
                    <button onClick={onLogout} className="block w-full text-left text-gray-900">
                      Logout
                    </button>
                  </>
                ) : (
                  <button onClick={() => alert("Open login modal")} className="block w-full text-left text-gray-900">
                    Sign In
                  </button>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
