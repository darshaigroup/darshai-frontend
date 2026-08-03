import {useMemo,useState} from "react";
import {AnimatePresence,motion} from "framer-motion";
import {Bell,Lock,Save,Settings as SettingsIcon,ShieldCheck,UserRound} from "lucide-react";
import AccountSettings from "./components/AccountSettings";
import SecuritySettings from "./components/SecuritySettings";

const TABS=[
  {id:"account",label:"Account",icon:UserRound,description:"Personal information & preferences"},
  {id:"security",label:"Security",icon:ShieldCheck,description:"Password & account protection"}
];

const SidebarItem=({item,active,onClick})=>{
  const Icon=item.icon;
  return(
    <button
      onClick={()=>onClick(item.id)}
      className={`group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
        active
          ?"bg-[#1E7A3A] text-white shadow-[0_8px_24px_rgba(30,122,58,.18)]"
          :"text-[#55635A] hover:bg-[#F4F8F5]"
      }`}
    >
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${active?"bg-white/15":"bg-[#EDF7F0] text-[#1E7A3A]"}`}>
        <Icon className="h-5 w-5"/>
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{item.label}</p>
        <p className={`truncate text-xs ${active?"text-white/75":"text-[#8A958D]"}`}>{item.description}</p>
      </div>
    </button>
  );
};

const MobileTabs=({active,onChange})=>(
  <div className="flex rounded-2xl bg-[#EDF3EE] p-1 lg:hidden">
    {TABS.map(tab=>{
      const Icon=tab.icon;
      return(
        <button
          key={tab.id}
          onClick={()=>onChange(tab.id)}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition ${
            active===tab.id
              ?"bg-white text-[#1E7A3A] shadow"
              :"text-[#68756D]"
          }`}
        >
          <Icon className="h-4 w-4"/>
          {tab.label}
        </button>
      );
    })}
  </div>
);

const HeaderCard=()=>(
  <section className="overflow-hidden rounded-3xl border border-[#E3E9E4] bg-white">
    <div className="bg-gradient-to-r from-[#1E7A3A] via-[#2C8B55] to-[#62B57C] p-6 text-white lg:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
            <SettingsIcon className="h-3.5 w-3.5"/>
            HR Settings
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            Account Settings
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-white/90">
            Manage your HR account, preferences and security settings. Changes
            made here will be reflected across your recruitment dashboard.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:w-[320px]">
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <UserRound className="h-5 w-5"/>
            <p className="mt-4 text-xs text-white/80">Profile</p>
            <h3 className="mt-1 text-lg font-bold">Complete</h3>
          </div>

          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <Lock className="h-5 w-5"/>
            <p className="mt-4 text-xs text-white/80">Security</p>
            <h3 className="mt-1 text-lg font-bold">Enabled</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const HRSettings=()=>{
  const [active,setActive]=useState("account");
  const ActiveComponent=useMemo(()=>{
    switch(active){
      case"security":return<SecuritySettings/>;
      default:return<AccountSettings/>;
    }
  },[active]);

  return(
    <motion.div
      initial={{opacity:0,y:14}}
      animate={{opacity:1,y:0}}
      transition={{duration:.3}}
      className="space-y-6"
    >
      <HeaderCard/>

      <MobileTabs active={active} onChange={setActive}/>

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">

        <aside className="hidden h-fit rounded-3xl border border-[#E3E9E4] bg-white p-5 lg:block">
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-[#243128]">
              Settings
            </h3>
            <p className="mt-1 text-sm text-[#7B867F]">
              Configure your account
            </p>
          </div>

          <nav className="space-y-3">
            {TABS.map(tab=>(
              <SidebarItem
                key={tab.id}
                item={tab}
                active={active===tab.id}
                onClick={setActive}
              />
            ))}
          </nav>

          <div className="mt-8 rounded-2xl border border-[#E6ECE7] bg-[#F8FAF8] p-4">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-[#1E7A3A]"/>
              <div>
                <p className="text-sm font-semibold text-[#243128]">
                  Notifications
                </p>
                <p className="text-xs text-[#8A958D]">
                  Recruitment alerts enabled
                </p>
              </div>
            </div>
          </div>
        </aside>

        <section className="space-y-6">

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{opacity:0,x:20}}
              animate={{opacity:1,x:0}}
              exit={{opacity:0,x:-20}}
              transition={{duration:.22}}
            >
              {ActiveComponent}
            </motion.div>
          </AnimatePresence>

          <div className="sticky bottom-4 z-20">
            <div className="flex flex-col gap-3 rounded-2xl border border-[#DDE5DF] bg-white/90 p-4 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="text-sm font-semibold text-[#243128]">
                  Unsaved Changes
                </h4>
                <p className="mt-1 text-xs text-[#7C8780]">
                  Save your preferences after making changes.
                </p>
              </div>

              <div className="flex gap-3">
                <button className="h-11 rounded-xl border border-[#DDE5DF] bg-white px-5 text-sm font-semibold text-[#5C6960] transition hover:bg-[#F5F8F6]">
                  Cancel
                </button>

                <button className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1E7A3A] px-6 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(30,122,58,.18)] transition hover:bg-[#17652F]">
                  <Save className="h-4 w-4"/>
                  Save Changes
                </button>
              </div>
            </div>
          </div>

        </section>

      </div>
    </motion.div>
  );
};

export default HRSettings;