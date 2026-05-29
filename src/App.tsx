import React, { useState, useEffect } from 'react';
import { 
  Sliders, 
  Copy, 
  Check, 
  RefreshCw, 
  Grid, 
  Layout, 
  Sidebar as SidebarIcon, 
  Sparkles, 
  Info, 
  Terminal, 
  Maximize2,
  Lock,
  Layers,
  Palette,
  Eye,
  Settings,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Code
} from 'lucide-react';

interface ComponentPreset {
  id: string;
  name: string;
  category: string;
}

export default function App() {
  // Style configurations
  const [activeTab, setActiveTab] = useState<'components' | 'layouts' | 'anatomy'>('components');
  const [selectedComponent, setSelectedComponent] = useState<string>('button');
  const [radius, setRadius] = useState<'none' | 'sm' | 'md' | 'lg' | 'full'>('md');
  const [colorHue, setColorHue] = useState<'neutral' | 'indigo' | 'emerald' | 'amber' | 'rose'>('indigo');
  const [borderWidth, setBorderWidth] = useState<'none' | '1px' | '2px'>('1px');
  const [padding, setPadding] = useState<'compact' | 'comfortable' | 'spacious'>('comfortable');
  const [shadow, setShadow] = useState<'none' | 'subtle' | 'accent' | 'deep'>('subtle');
  
  // Interactive mini-states
  const [buttonStyle, setButtonStyle] = useState<'primary' | 'secondary' | 'outline' | 'ghost'>('primary');
  const [inputState, setInputState] = useState<'default' | 'error' | 'success'>('default');
  const [cardStyle, setCardStyle] = useState<'flat' | 'elevated' | 'glass'>('elevated');
  const [badgeStyle, setBadgeStyle] = useState<'solid' | 'subtle' | 'outline'>('subtle');
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const [btnText, setBtnText] = useState<string>('Interactive Action');
  const [inputText, setInputText] = useState<string>('Customize this text live');
  const [badgeText, setBadgeText] = useState<string>('Premium Feature');
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [layoutPreset, setLayoutPreset] = useState<'grid-3' | 'bento' | 'sidebar-split'>('grid-3');

  // Trigger flash notification helper
  const triggerCopyFeedback = (textToCopy: string, label: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopyFeedback(label);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  // Helper selectors to dynamically resolve Tailwind properties
  const getRadiusClass = () => {
    switch (radius) {
      case 'none': return 'rounded-none';
      case 'sm': return 'rounded-sm';
      case 'md': return 'rounded-md';
      case 'lg': return 'rounded-lg';
      case 'full': return 'rounded-full';
    }
  };

  const getBorderWidthClass = () => {
    switch (borderWidth) {
      case 'none': return 'border-0';
      case '1px': return 'border';
      case '2px': return 'border-2';
    }
  };

  const getPaddingClass = (type: 'button' | 'card' | 'badge') => {
    if (type === 'button') {
      switch (padding) {
        case 'compact': return 'px-3 py-1.5 text-xs';
        case 'comfortable': return 'px-5 py-2.5 text-sm';
        case 'spacious': return 'px-7 py-3.5 text-base';
      }
    } else if (type === 'badge') {
      switch (padding) {
        case 'compact': return 'px-2 py-0.5 text-[10px]';
        case 'comfortable': return 'px-3 py-1 text-xs';
        case 'spacious': return 'px-4 py-1.5 text-sm';
      }
    } else { // Card
      switch (padding) {
        case 'compact': return 'p-4';
        case 'comfortable': return 'p-6';
        case 'spacious': return 'p-8';
      }
    }
  };

  const getShadowClass = () => {
    switch (shadow) {
      case 'none': return 'shadow-none';
      case 'subtle': return 'shadow-[0_2px_8px_-3px_rgba(0,0,0,0.06),0_10px_20px_-15px_rgba(0,0,0,0.04)]';
      case 'accent': {
        switch (colorHue) {
          case 'indigo': return 'shadow-[0_8px_30px_rgb(224,231,255)]';
          case 'emerald': return 'shadow-[0_8px_30px_rgb(209,250,229)]';
          case 'amber': return 'shadow-[0_8px_30px_rgb(254,243,199)]';
          case 'rose': return 'shadow-[0_8px_30px_rgb(FFE4E6)]';
          case 'neutral': return 'shadow-[0_8px_30px_rgba(0,0,0,0.06)]';
        }
      }
      case 'deep': return 'shadow-[0_15px_40px_-5px_rgba(0,0,0,0.1),0_5px_10px_-4px_rgba(0,0,0,0.04)]';
    }
  };

  // Resolve core colors depending on selected Hue
  const getColorClasses = (variant: 'primary' | 'secondary' | 'bg-soft' | 'border' | 'text' | 'accent-hover') => {
    const formulas = {
      neutral: {
        primary: 'bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-950',
        secondary: 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border-zinc-200',
        bgSoft: 'bg-zinc-50 text-zinc-800',
        border: 'border-zinc-200 focus:ring-zinc-650',
        text: 'text-zinc-900',
        hover: 'hover:text-zinc-900 hover:bg-zinc-100'
      },
      indigo: {
        primary: 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-700',
        secondary: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-100',
        bgSoft: 'bg-indigo-50/50 text-indigo-900',
        border: 'border-indigo-200 focus:ring-indigo-500',
        text: 'text-indigo-600',
        hover: 'hover:text-indigo-700 hover:bg-indigo-50'
      },
      emerald: {
        primary: 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700',
        secondary: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-100',
        bgSoft: 'bg-emerald-50/50 text-emerald-900',
        border: 'border-emerald-200 focus:ring-emerald-500',
        text: 'text-emerald-600',
        hover: 'hover:text-emerald-700 hover:bg-emerald-50'
      },
      amber: {
        primary: 'bg-amber-500 hover:bg-amber-600 text-zinc-950 border-amber-600',
        secondary: 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-100',
        bgSoft: 'bg-amber-50/60 text-amber-900',
        border: 'border-amber-200 focus:ring-amber-500',
        text: 'text-amber-600',
        hover: 'hover:text-amber-700 hover:bg-amber-50'
      },
      rose: {
        primary: 'bg-rose-600 hover:bg-rose-700 text-white border-rose-700',
        secondary: 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-100',
        bgSoft: 'bg-rose-50/50 text-rose-900',
        border: 'border-rose-200 focus:ring-rose-500',
        text: 'text-rose-600',
        hover: 'hover:text-rose-700 hover:bg-rose-50'
      }
    };
    
    const activeFormula = formulas[colorHue];
    switch (variant) {
      case 'primary': return activeFormula.primary;
      case 'secondary': return activeFormula.secondary;
      case 'bg-soft': return activeFormula.bgSoft;
      case 'border': return activeFormula.border;
      case 'text': return activeFormula.text;
      case 'accent-hover': return activeFormula.hover;
    }
  };

  // Compile active classes for output template previewing
  const getRenderedClasses = (mode: 'button' | 'input' | 'card' | 'badge') => {
    const common = `${getRadiusClass()} ${getShadowClass()} transition-all duration-150`;
    
    if (mode === 'button') {
      const paddingClass = getPaddingClass('button');
      const bStyle = buttonStyle;
      let finalStyle = '';
      if (bStyle === 'primary') {
        finalStyle = getColorClasses('primary');
      } else if (bStyle === 'secondary') {
        finalStyle = getColorClasses('secondary');
      } else if (bStyle === 'outline') {
        finalStyle = `border ${getColorClasses('border')} bg-white ${getColorClasses('text')} ${getColorClasses('accent-hover')}`;
      } else { // ghost
        finalStyle = `bg-transparent ${getColorClasses('text')} ${getColorClasses('accent-hover')}`;
      }
      return `flex items-center justify-center gap-2 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 select-none ${common} ${paddingClass} ${finalStyle}`;
    }
    
    if (mode === 'input') {
      let stateBorder = `border ${getColorClasses('border')} focus:ring-2 focus:ring-offset-0`;
      if (inputState === 'error') {
        stateBorder = 'border-rose-500 focus:ring-rose-200 bg-rose-50/20 text-rose-900 focus:ring-2';
      } else if (inputState === 'success') {
        stateBorder = 'border-emerald-500 focus:ring-emerald-200 bg-emerald-50/20 text-emerald-900 focus:ring-2';
      }
      return `w-full ${getPaddingClass('button')} bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none transition-colors ${getRadiusClass()} ${stateBorder}`;
    }
    
    if (mode === 'card') {
      const pad = getPaddingClass('card');
      const border = getBorderWidthClass();
      let borderClr = 'border-zinc-200/80';
      let cardBg = 'bg-white';
      
      if (cardStyle === 'flat') {
        return `bg-zinc-50 border border-zinc-100 ${getRadiusClass()} ${pad}`;
      } else if (cardStyle === 'glass') {
        cardBg = 'bg-white/70 backdrop-blur-md';
        borderClr = 'border-white/40';
      }
      return `${cardBg} ${border} ${borderClr} ${common} ${pad}`;
    }
    
    if (mode === 'badge') {
      const pad = getPaddingClass('badge');
      const commonBadge = `inline-flex items-center gap-1.5 font-semibold tracking-wide ${getRadiusClass()} ${pad}`;
      if (badgeStyle === 'solid') {
        return `${commonBadge} ${getColorClasses('primary')}`;
      } else if (badgeStyle === 'subtle') {
        return `${commonBadge} ${getColorClasses('bg-soft')}`;
      } else { // outline
        return `${commonBadge} border ${getColorClasses('border')} ${getColorClasses('text')} bg-white`;
      }
    }
    
    return '';
  };

  // Simulate primary load behavior
  const handleSimulatedClick = () => {
    setIsButtonLoading(true);
    setBtnText('Processing Request');
    setTimeout(() => {
      setIsButtonLoading(false);
      setBtnText('Interactive Action');
    }, 1500);
  };

  return (
    <div id="app_root" className="min-h-screen bg-slate-50 text-zinc-800 flex flex-col font-sans select-text">
      
      {/* Header Area */}
      <header id="app_header" className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-6 py-4 flex items-center justify-between">
        <div id="logo_container" className="flex items-center gap-3">
          <div id="logo_icon" className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
            <Palette className="w-5 h-5" id="logo_svg" />
          </div>
          <div>
            <h1 id="app_title" className="text-lg font-bold text-zinc-900 leading-none">Tailwind Component Sandbox</h1>
            <p id="app_subtitle" className="text-xs text-zinc-500 mt-1">Interactive GUI utility for designers & builders</p>
          </div>
        </div>

        {/* Tab Selection */}
        <nav id="app_nav" className="flex bg-zinc-100/80 p-1 rounded-lg border border-zinc-200/50">
          <button 
            id="nav_btn_components"
            onClick={() => setActiveTab('components')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${activeTab === 'components' ? 'bg-white text-zinc-950 shadow-xs' : 'text-zinc-650 hover:text-zinc-900'}`}
          >
            <Layers className="w-3.5 h-3.5 inline mr-1.5" />
            Interactive Lab
          </button>
          <button 
            id="nav_btn_layouts"
            onClick={() => setActiveTab('layouts')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${activeTab === 'layouts' ? 'bg-white text-zinc-950 shadow-xs' : 'text-zinc-650 hover:text-zinc-900'}`}
          >
            <Grid className="w-3.5 h-3.5 inline mr-1.5" />
            Grid Layouts
          </button>
          <button 
            id="nav_btn_anatomy"
            onClick={() => setActiveTab('anatomy')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all ${activeTab === 'anatomy' ? 'bg-white text-zinc-950 shadow-xs' : 'text-zinc-650 hover:text-zinc-900'}`}
          >
            <Info className="w-3.5 h-3.5 inline mr-1.5" />
            Design Guides
          </button>
        </nav>

        {/* Action button */}
        <div id="header_spec_details" className="hidden md:flex items-center gap-2">
          <span id="spec_badge" className="text-[11px] px-2.5 py-1 font-mono font-medium rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200">
            Tailwind v4.0.0
          </span>
        </div>
      </header>

      {/* Main Container Area */}
      <main id="app_main" className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col gap-8">
        
        {/* Copy Feedback Toast */}
        {copyFeedback && (
          <div id="global_toast" className="fixed bottom-6 right-6 z-50 bg-zinc-950 text-white text-xs font-medium px-4 py-3 rounded-lg shadow-lg flex items-center gap-2.5 border border-zinc-800 animate-slide-in">
            <Check className="w-4 h-4 text-emerald-400" id="toast_check_svg" />
            <span>Copied <strong className="font-bold">{copyFeedback}</strong> to your clipboard</span>
          </div>
        )}

        {/* TAB 1: INTERACTIVE COMPONENTS */}
        {activeTab === 'components' && (
          <div id="tab_components" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Control Workbench: 4 Columns on lg */}
            <section id="workbench_panel" className="lg:col-span-4 bg-white border border-zinc-200/80 rounded-xl p-6 shadow-xs flex flex-col gap-6">
              <div id="workbench_header" className="flex items-center gap-2 pb-4 border-b border-zinc-100">
                <Sliders className="w-4 h-4 text-indigo-600" />
                <h2 className="text-sm font-bold text-zinc-900">Style Workbench</h2>
              </div>

              {/* 1. Component Selection */}
              <div id="form_group_component_type" className="flex flex-col gap-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Select Component</label>
                <div id="com_select_grid" className="grid grid-cols-2 gap-2">
                  <button 
                    id="com_btn_button"
                    onClick={() => setSelectedComponent('button')}
                    className={`py-2 px-3 text-xs font-medium border rounded-lg transition-all ${selectedComponent === 'button' ? 'border-indigo-600 bg-indigo-50/20 text-indigo-700 font-semibold' : 'border-zinc-200 hover:bg-zinc-50 text-zinc-700'}`}
                  >
                    Action Button
                  </button>
                  <button 
                    id="com_btn_input"
                    onClick={() => setSelectedComponent('input')}
                    className={`py-2 px-3 text-xs font-medium border rounded-lg transition-all ${selectedComponent === 'input' ? 'border-indigo-600 bg-indigo-50/20 text-indigo-700 font-semibold' : 'border-zinc-200 hover:bg-zinc-50 text-zinc-700'}`}
                  >
                    Text Input Field
                  </button>
                  <button 
                    id="com_btn_card"
                    onClick={() => setSelectedComponent('card')}
                    className={`py-2 px-3 text-xs font-medium border rounded-lg transition-all ${selectedComponent === 'card' ? 'border-indigo-600 bg-indigo-50/20 text-indigo-700 font-semibold' : 'border-zinc-200 hover:bg-zinc-50 text-zinc-700'}`}
                  >
                    Information Card
                  </button>
                  <button 
                    id="com_btn_badge"
                    onClick={() => setSelectedComponent('badge')}
                    className={`py-2 px-3 text-xs font-medium border rounded-lg transition-all ${selectedComponent === 'badge' ? 'border-indigo-600 bg-indigo-50/20 text-indigo-700 font-semibold' : 'border-zinc-200 hover:bg-zinc-50 text-zinc-700'}`}
                  >
                    Status Badge
                  </button>
                </div>
              </div>

              {/* 2. Style Preset Options for Specific Elements */}
              {selectedComponent === 'button' && (
                <div id="btn_props_box" className="bg-zinc-50 p-4 rounded-lg flex flex-col gap-3 border border-zinc-100">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase">Button Modifier</span>
                  <div className="grid grid-cols-2 gap-1.5 bg-zinc-200/50 p-1 rounded-md">
                    {(['primary', 'secondary', 'outline', 'ghost'] as const).map((style) => (
                      <button
                        key={style}
                        id={`btn_style_${style}`}
                        onClick={() => setButtonStyle(style)}
                        className={`py-1 px-2.5 text-center text-xs rounded font-medium capitalize transition-all ${buttonStyle === style ? 'bg-white text-zinc-950 shadow-xs' : 'text-zinc-650 hover:text-zinc-900'}`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedComponent === 'input' && (
                <div id="input_props_box" className="bg-zinc-50 p-4 rounded-lg flex flex-col gap-3 border border-zinc-100">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase">Validation State</span>
                  <div className="grid grid-cols-3 gap-1.5 bg-zinc-200/50 p-1 rounded-md">
                    {(['default', 'error', 'success'] as const).map((state) => (
                      <button
                        key={state}
                        id={`input_state_${state}`}
                        onClick={() => setInputState(state)}
                        className={`py-1 px-2 text-center text-[10px] uppercase rounded font-bold transition-all ${inputState === state ? 'bg-white text-zinc-950 shadow-xs' : 'text-zinc-650 hover:text-zinc-900'}`}
                      >
                        {state}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedComponent === 'card' && (
                <div id="card_props_box" className="bg-zinc-50 p-4 rounded-lg flex flex-col gap-3 border border-zinc-100">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase">Elevation Mode</span>
                  <div className="grid grid-cols-3 gap-1.5 bg-zinc-200/50 p-1 rounded-md">
                    {(['flat', 'elevated', 'glass'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        id={`card_style_${lvl}`}
                        onClick={() => setCardStyle(lvl)}
                        className={`py-1 px-2 text-center text-[11px] rounded font-semibold capitalize transition-all ${cardStyle === lvl ? 'bg-white text-zinc-950 shadow-xs' : 'text-zinc-650 hover:text-zinc-900'}`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedComponent === 'badge' && (
                <div id="badge_props_box" className="bg-zinc-50 p-4 rounded-lg flex flex-col gap-3 border border-zinc-100">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase">Badge Theme</span>
                  <div className="grid grid-cols-3 gap-1.5 bg-zinc-200/50 p-1 rounded-md">
                    {(['solid', 'subtle', 'outline'] as const).map((bTmp) => (
                      <button
                        key={bTmp}
                        id={`badge_style_${bTmp}`}
                        onClick={() => setBadgeStyle(bTmp)}
                        className={`py-1 px-2 text-center text-[11px] rounded font-semibold capitalize transition-all ${badgeStyle === bTmp ? 'bg-white text-zinc-950 shadow-xs' : 'text-zinc-650 hover:text-zinc-900'}`}
                      >
                        {bTmp}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Color Hue Palette */}
              <div id="palette_group" className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Dynamic Color Theme</label>
                  <span className="text-[10px] font-semibold text-indigo-600 capitalize px-1.5 py-0.5 rounded bg-indigo-50">{colorHue}</span>
                </div>
                <div id="color_selectors" className="flex gap-3 justify-between items-center bg-zinc-50 p-2.5 rounded-lg border border-zinc-100">
                  <button 
                    id="color_btn_indigo"
                    onClick={() => setColorHue('indigo')}
                    className={`w-7 h-7 rounded-full bg-indigo-600 ring-offset-2 transition-transform ${colorHue === 'indigo' ? 'ring-2 ring-indigo-500 scale-110' : 'hover:scale-105'}`}
                    title="Indigo Blue"
                  />
                  <button 
                    id="color_btn_emerald"
                    onClick={() => setColorHue('emerald')}
                    className={`w-7 h-7 rounded-full bg-emerald-600 ring-offset-2 transition-transform ${colorHue === 'emerald' ? 'ring-2 ring-emerald-500 scale-110' : 'hover:scale-105'}`}
                    title="Emerald Green"
                  />
                  <button 
                    id="color_btn_rose"
                    onClick={() => setColorHue('rose')}
                    className={`w-7 h-7 rounded-full bg-rose-600 ring-offset-2 transition-transform ${colorHue === 'rose' ? 'ring-2 ring-rose-500 scale-110' : 'hover:scale-105'}`}
                    title="Rose Pink"
                  />
                  <button 
                    id="color_btn_amber"
                    onClick={() => setColorHue('amber')}
                    className={`w-7 h-7 rounded-full bg-amber-500 ring-offset-2 transition-transform ${colorHue === 'amber' ? 'ring-2 ring-amber-500 scale-110' : 'hover:scale-105'}`}
                    title="Amber Accent"
                  />
                  <button 
                    id="color_btn_neutral"
                    onClick={() => setColorHue('neutral')}
                    className={`w-7 h-7 rounded-full bg-zinc-900 border border-zinc-700 ring-offset-2 transition-transform ${colorHue === 'neutral' ? 'ring-2 ring-zinc-700 scale-110' : 'hover:scale-105'}`}
                    title="Neutral Charcoal"
                  />
                </div>
              </div>

              {/* 4. Padding / Spacing Selector */}
              <div id="padding_slider_group" className="flex flex-col gap-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex justify-between">
                  <span>Padding Density</span>
                  <span className="capitalize font-semibold text-zinc-900">{padding}</span>
                </label>
                <div className="grid grid-cols-3 gap-1 bg-zinc-100 p-1 rounded-lg">
                  {(['compact', 'comfortable', 'spacious'] as const).map((padPreset) => (
                    <button
                      key={padPreset}
                      id={`pading_opt_${padPreset}`}
                      onClick={() => setPadding(padPreset)}
                      className={`py-1.5 text-xs font-medium rounded-md capitalize transition-all ${padding === padPreset ? 'bg-white text-zinc-950 shadow-xs' : 'text-zinc-650 hover:text-zinc-900'}`}
                    >
                      {padPreset}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Rounded Coordinates */}
              <div id="border_radius_group" className="flex flex-col gap-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex justify-between">
                  <span>Border Radius</span>
                  <span className="font-semibold text-zinc-900 uppercase text-[10px]">{radius === 'none' ? '0px' : radius === 'sm' ? '2px' : radius === 'md' ? '6px' : radius === 'lg' ? '12px font-semibold' : '999px rounded'}</span>
                </label>
                <div className="grid grid-cols-5 gap-1 bg-zinc-100 p-1 rounded-lg text-center">
                  {(['none', 'sm', 'md', 'lg', 'full'] as const).map((r) => (
                    <button
                      key={r}
                      id={`radius_opt_${r}`}
                      onClick={() => setRadius(r)}
                      className={`py-1 text-xs font-bold uppercase rounded-md transition-all ${radius === r ? 'bg-white text-zinc-950 shadow-xs' : 'text-zinc-500 hover:text-zinc-800'}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* 6. Border thickness & Drop Shadow */}
              <div className="grid grid-cols-2 gap-4">
                <div id="border_width_group" className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Border Width</label>
                  <select 
                    id="border_select"
                    value={borderWidth} 
                    onChange={(e: any) => setBorderWidth(e.target.value)}
                    className="w-full text-xs font-semibold py-2 px-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-800 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="none">None (0px)</option>
                    <option value="1px">Thin (1px)</option>
                    <option value="2px">Thick (2px)</option>
                  </select>
                </div>

                <div id="shadow_group" className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Drop Shadow</label>
                  <select 
                    id="shadow_select"
                    value={shadow} 
                    onChange={(e: any) => setShadow(e.target.value as any)}
                    className="w-full text-xs font-semibold py-2 px-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-800 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="none">Flat (None)</option>
                    <option value="subtle">Subtle</option>
                    <option value="accent">Theme Glow</option>
                    <option value="deep">Deep Shadow</option>
                  </select>
                </div>
              </div>

            </section>

            {/* Live Preview & Code Panel: 8 Columns on lg */}
            <section id="preview_panel" className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Canvas Board */}
              <div id="preview_canvas_container" className="bg-white border border-zinc-200/80 rounded-xl p-8 shadow-xs flex-1 flex flex-col min-h-[380px] justify-between relative overflow-hidden">
                
                {/* Background Dots */}
                <div id="canvas_mesh_bg" className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />
                
                {/* Top Canvas Banner */}
                <div id="canvas_header" className="relative flex items-center justify-between border-b border-zinc-100 pb-4 mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Real-time Sandbox Playground</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                </div>

                {/* Central Focus Element */}
                <div id="canvas_focus_zone" className="relative flex-1 flex justify-center items-center py-10 z-10">
                  
                  {/* Dynamic Element Wrapper */}
                  {selectedComponent === 'button' && (
                    <button 
                      id="interactive_sandbox_btn"
                      onClick={handleSimulatedClick}
                      disabled={isButtonLoading}
                      className={getRenderedClasses('button')}
                    >
                      {isButtonLoading && <RefreshCw className="w-4 h-4 animate-spin" />}
                      <span>{btnText}</span>
                    </button>
                  )}

                  {selectedComponent === 'input' && (
                    <div id="interactive_input_wrap" className="w-full max-w-sm flex flex-col gap-2 p-1">
                      <label className="text-xs font-bold text-zinc-650">Label Indicator</label>
                      <input 
                        id="interactive_sandbox_input"
                        type="text" 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Live editing text..."
                        className={getRenderedClasses('input')}
                      />
                      <span className={`text-[11px] font-medium ${inputState === 'error' ? 'text-rose-500' : inputState === 'success' ? 'text-emerald-500' : 'text-zinc-400'}`}>
                        {inputState === 'error' && '⚡ Validation failed: Check parameter criteria.'}
                        {inputState === 'success' && '✓ State is validated and stable.'}
                        {inputState === 'default' && 'Enter text details into input bar.'}
                      </span>
                    </div>
                  )}

                  {selectedComponent === 'card' && (
                    <div id="interactive_sandbox_card" className={`${getRenderedClasses('card')} w-full max-w-md`}>
                      <div className="flex justify-between items-start mb-3">
                        <span className={`text-[10px] font-bold tracking-widest uppercase py-0.5 px-2 bg-indigo-50 text-indigo-700 ${getRadiusClass()}`}>
                          Information Node
                        </span>
                        <span className="text-xs font-semibold text-zinc-400 text-right">ID: #8A4D</span>
                      </div>
                      <h3 className="text-base font-bold text-zinc-900 mb-1">Interactive Container</h3>
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        Customize visual dimensions and styles in the left workbench. Watch shadows, padding depths, and borders render seamlessly.
                      </p>
                      <div className="mt-4 pt-4 border-t border-zinc-100/80 flex items-center justify-between text-xs text-zinc-400">
                        <span>Updated live</span>
                        <button id="card_action_demo" className="text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center gap-1">
                          Interact <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedComponent === 'badge' && (
                    <div id="badge_preview_strip" className="flex flex-col items-center gap-6">
                      <span id="interactive_sandbox_badge" className={getRenderedClasses('badge')}>
                        <Sparkles className="w-3 h-3" />
                        {badgeText}
                      </span>
                      
                      {/* Interactive modifier box */}
                      <div className="flex gap-2 items-center bg-zinc-50 rounded-lg p-2 border border-zinc-100 shadow-xs">
                        <span className="text-[10px] text-zinc-400 uppercase font-black px-2">Label:</span>
                        <input 
                          id="badge_editor_input"
                          type="text" 
                          value={badgeText} 
                          onChange={(e) => setBadgeText(e.target.value)}
                          className="bg-white border border-zinc-200 text-xs px-2 py-1 rounded w-32 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  )}

                </div>

                {/* Bottom Stats details */}
                <div id="canvas_footer_stats" className="relative text-xs text-zinc-400 border-t border-zinc-100 pt-4 flex flex-wrap gap-4 items-center justify-between z-10">
                  <div className="flex gap-4">
                    <span>Hue: <strong className="font-bold text-zinc-700 capitalize">{colorHue}</strong></span>
                    <span>Radius: <strong className="font-bold text-zinc-700 capitalize">{radius}</strong></span>
                    <span>Shadow: <strong className="font-bold text-zinc-700 capitalize">{shadow}</strong></span>
                  </div>
                  <button 
                    id="trigger_doc_panel"
                    onClick={() => setActiveTab('anatomy')}
                    className="text-xs text-indigo-500 font-semibold hover:underline flex items-center gap-1"
                  >
                    See Design Best Practices <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Live CSS Code block */}
              <div id="code_block_panel" className="bg-zinc-950 text-zinc-200 border border-zinc-900 rounded-xl p-5 shadow-lg flex flex-col gap-3">
                <div id="code_block_header" className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Terminal className="text-zinc-500 w-4 h-4" />
                    <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">Tailwind Utility Class List</span>
                  </div>
                  <button 
                    id="copy_code_btn"
                    onClick={() => triggerCopyFeedback(getRenderedClasses(selectedComponent as any), 'Tailwind Classes')}
                    className="flex items-center gap-1.5 text-[11px] bg-zinc-900 text-zinc-300 py-1.5 px-3 rounded-md hover:bg-zinc-800 hover:text-white transition-colors border border-zinc-800"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copy Class String
                  </button>
                </div>
                
                {/* Visual String block */}
                <div id="code_render_canvas" className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-800 flex items-center font-mono text-xs text-emerald-400 select-all overflow-x-auto whitespace-pre leading-relaxed scrollbar-thin">
                  {getRenderedClasses(selectedComponent as any)}
                </div>

                {/* Visual HTML block */}
                <div id="html_code_block" className="flex flex-col gap-2">
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Interactive Element HTML Syntax</span>
                    <button 
                      id="copy_html_btn"
                      onClick={() => {
                        let htmlSnippet = '';
                        if (selectedComponent === 'button') {
                          htmlSnippet = `<button className="${getRenderedClasses('button')}">${btnText}</button>`;
                        } else if (selectedComponent === 'input') {
                          htmlSnippet = `<input className="${getRenderedClasses('input')}" value="${inputText}" placeholder="Placeholder text" />`;
                        } else if (selectedComponent === 'card') {
                          htmlSnippet = `<div className="${getRenderedClasses('card')}">\n  <h3>Interactive Card Title</h3>\n  <p>Content information goes here.</p>\n</div>`;
                        } else if (selectedComponent === 'badge') {
                          htmlSnippet = `<span className="${getRenderedClasses('badge')}">${badgeText}</span>`;
                        }
                        triggerCopyFeedback(htmlSnippet, 'HTML Snippet');
                      }}
                      className="text-[10px] text-indigo-400 hover:underline font-bold"
                    >
                      Copy Complete HTML
                    </button>
                  </div>
                  <div id="html_code_view" className="bg-zinc-900/30 p-3 rounded-lg border border-zinc-900/50 font-mono text-zinc-400 text-xs overflow-x-auto select-all">
                    {selectedComponent === 'button' && (
                      <span>{`<button className="`}<span className="text-indigo-400">{getRenderedClasses('button')}</span>{`">${btnText}</button>`}</span>
                    )}
                    {selectedComponent === 'input' && (
                      <span>{`<input className="`}<span className="text-indigo-400">{getRenderedClasses('input')}</span>{`" value="${inputText}" />`}</span>
                    )}
                    {selectedComponent === 'card' && (
                      <span>
                        {`<div className="`}<span className="text-indigo-400">{getRenderedClasses('card')}</span>{`">`}
                        <br />&nbsp;&nbsp;{`<h3>Card Title</h3>`}
                        <br />&nbsp;&nbsp;{`<p>Card content information goes here.</p>`}
                        <br />{`</div>`}
                      </span>
                    )}
                    {selectedComponent === 'badge' && (
                      <span>{`<span className="`}<span className="text-indigo-400">{getRenderedClasses('badge')}</span>{`">${badgeText}</span>`}</span>
                    )}
                  </div>
                </div>

              </div>

            </section>

          </div>
        )}

        {/* TAB 2: FLEX & GRID LAYOUTS */}
        {activeTab === 'layouts' && (
          <div id="tab_layouts" className="flex flex-col gap-6">
            
            {/* Header selection blocks */}
            <div id="layout_ctrls" className="bg-white border border-zinc-200/80 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-zinc-900">Layout Presets & Responsive Structures</h2>
                <p className="text-xs text-zinc-500 mt-0.5">Toggle spacing ratios, alignments, and grids to observe responsiveness</p>
              </div>

              <div id="btn_grp_layout_types" className="flex gap-2 self-start md:self-auto bg-zinc-100 p-1 rounded-lg">
                <button 
                  id="layout_btn_grid"
                  onClick={() => setLayoutPreset('grid-3')}
                  className={`py-1.5 px-3.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${layoutPreset === 'grid-3' ? 'bg-white text-zinc-950 shadow-xs' : 'text-zinc-650 hover:text-zinc-900'}`}
                >
                  <Grid className="w-3.5 h-3.5" />
                  3-Column Grid
                </button>
                <button 
                  id="layout_btn_bento"
                  onClick={() => setLayoutPreset('bento')}
                  className={`py-1.5 px-3.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${layoutPreset === 'bento' ? 'bg-white text-zinc-950 shadow-xs' : 'text-zinc-650 hover:text-zinc-900'}`}
                >
                  <Layout className="w-3.5 h-3.5" />
                  Asymmetric Bento
                </button>
                <button 
                  id="layout_btn_sidebar"
                  onClick={() => setLayoutPreset('sidebar-split')}
                  className={`py-1.5 px-3.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${layoutPreset === 'sidebar-split' ? 'bg-white text-zinc-950 shadow-xs' : 'text-zinc-650 hover:text-zinc-900'}`}
                >
                  <SidebarIcon className="w-3.5 h-3.5" />
                  Split Sidebar
                </button>
              </div>
            </div>

            {/* Layout Stage area */}
            <div id="layout_live_stage" className="bg-white border border-zinc-200/80 rounded-xl p-6 md:p-8 shadow-xs min-h-[400px]">
              
              {/* Preset 1: 3-Column Grid */}
              {layoutPreset === 'grid-3' && (
                <div id="sandbox_grid_showcase" className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                  
                  {/* Card 1 */}
                  <div id="grid_card_left" className={`bg-zinc-50 border border-zinc-200/60 p-6 flex flex-col gap-4 ${getRadiusClass()} ${getShadowClass()}`}>
                    <div className="w-8 h-8 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs" id="grid1_badge">1</div>
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900">Adaptive Card Structuring</h3>
                      <p className="text-xs text-zinc-550 mt-1 leading-relaxed">Runs on standard columns using the responsive width variables.</p>
                    </div>
                    <div className="pt-2 border-t border-zinc-200/40 mt-auto">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold">flex flex-col gap-4</span>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div id="grid_card_center" className={`bg-zinc-50 border border-zinc-200/60 p-6 flex flex-col gap-4 ${getRadiusClass()} ${getShadowClass()}`}>
                    <div className="w-8 h-8 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs" id="grid2_badge">2</div>
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900">Consistent Paddings</h3>
                      <p className="text-xs text-zinc-550 mt-1 leading-relaxed">Generates high-contrast vertical rhythm with responsive container gaps.</p>
                    </div>
                    <div className="pt-2 border-t border-zinc-200/40 mt-auto">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold">col-span-1 border</span>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div id="grid_card_right" className={`bg-zinc-50 border border-zinc-200/60 p-6 flex flex-col gap-4 ${getRadiusClass()} ${getShadowClass()}`}>
                    <div className="w-8 h-8 rounded bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs" id="grid3_badge">3</div>
                    <div>
                      <h3 className="text-sm font-bold text-zinc-900">Custom Interactivity</h3>
                      <p className="text-xs text-zinc-550 mt-1 leading-relaxed">Configure coordinates on the Component menu to alter these cards in real-time.</p>
                    </div>
                    <div className="pt-2 border-t border-zinc-200/40 mt-auto">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold">rounded-lg h-full</span>
                    </div>
                  </div>

                </div>
              )}

              {/* Preset 2: Asymmetric Bento Grid */}
              {layoutPreset === 'bento' && (
                <div id="sandbox_bento_showcase" className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in font-sans">
                  
                  {/* Big Hero block: Col span 2, row span 2 */}
                  <div id="bento_hero_block" className={`md:col-span-2 md:row-span-2 bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-8 flex flex-col justify-between border border-indigo-200/60 min-h-[300px] ${getRadiusClass()} ${getShadowClass()}`}>
                    <span className="text-[10px] bg-indigo-600 text-white font-bold tracking-wider px-2.5 py-1 rounded-full w-max uppercase">Hero Slot</span>
                    <div className="my-6">
                      <h3 className="text-lg font-black text-indigo-950">Asymmetric Bento Canvas</h3>
                      <p className="text-xs text-indigo-850 mt-1 leading-relaxed max-w-sm">
                        Bento structures emphasize depth and hierarchy. Use large feature anchors with secondary smaller modules in context.
                      </p>
                    </div>
                    <div className="flex gap-2 items-center text-xs font-bold text-indigo-900 mt-auto">
                      <span>grid-cols-4 md:row-span-2</span>
                    </div>
                  </div>

                  {/* Small block 1 */}
                  <div id="bento_small_block_1" className={`md:col-span-2 bg-zinc-50 border border-zinc-200/60 p-6 flex items-center gap-4 ${getRadiusClass()} ${getShadowClass()}`}>
                    <div className="w-10 h-10 rounded-full bg-zinc-200/50 flex-shrink-0 flex items-center justify-center font-bold" id="bento_s1_circle font-mono">A</div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900">Secondary Horizon</h4>
                      <p className="text-[11px] text-zinc-500">Perfect block ratio for summary data or active analytics lists.</p>
                    </div>
                  </div>

                  {/* Small block 2 */}
                  <div id="bento_small_block_2" className={`md:col-span-1 bg-zinc-50 border border-zinc-200/60 p-6 flex flex-col justify-between ${getRadiusClass()} ${getShadowClass()}`}>
                    <span className="text-[10px] font-bold text-zinc-400 tracking-wider font-mono">MODULE B</span>
                    <p className="text-xs text-zinc-650 mt-3 font-semibold">Structured list details</p>
                    <span className="text-[10px] text-zinc-400 mt-4 border-t pt-2 border-zinc-200">100px block</span>
                  </div>

                  {/* Small block 3 */}
                  <div id="bento_small_block_3" className={`md:col-span-1 bg-zinc-900 text-zinc-200 p-6 flex flex-col justify-between ${getRadiusClass()} ${getShadowClass()}`}>
                    <span className="text-[10px] text-white/55 font-bold tracking-wider font-mono">DARK CAPABILITY</span>
                    <p className="text-xs text-zinc-300 mt-3 font-semibold">Contrast Anchor</p>
                    <span className="text-[10px] text-emerald-400 mt-4 pt-2 border-t border-zinc-800">High Impact</span>
                  </div>

                </div>
              )}

              {/* Preset 3: Split Sidebar */}
              {layoutPreset === 'sidebar-split' && (
                <div id="sandbox_sidebar_showcase" className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fade-in">
                  
                  {/* Left Sidebar block */}
                  <aside id="sidebar_block" className={`lg:col-span-1 bg-zinc-50 border border-zinc-200/60 p-5 flex flex-col gap-4 ${getRadiusClass()} ${getShadowClass()}`}>
                    <div className="flex items-center gap-2 border-b border-zinc-200/50 pb-3">
                      <Settings className="w-4 h-4 text-zinc-500" />
                      <h3 className="text-xs font-black text-zinc-900 uppercase">Control Board</h3>
                    </div>
                    <ul className="flex flex-col gap-1.5 text-xs" id="sidebar_dummy_list">
                      <li className="py-2 px-2.5 rounded bg-zinc-200/60 font-bold text-zinc-900 flex items-center justify-between">
                        <span>Dashboard Overview</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </li>
                      <li className="py-2 px-2.5 rounded text-zinc-650 hover:bg-zinc-150 transition-colors">Team Members</li>
                      <li className="py-2 px-2.5 rounded text-zinc-650 hover:bg-zinc-150 transition-colors">Workspace Logs</li>
                      <li className="py-2 px-2.5 rounded text-zinc-650 hover:bg-zinc-150 transition-colors">Subscription billing</li>
                    </ul>
                    <div className="mt-auto pt-4 border-t border-zinc-200/50 text-[10px] text-zinc-400 font-mono">
                      <span>lg:col-span-1</span>
                    </div>
                  </aside>

                  {/* Right Main area block */}
                  <div id="sidebar_main_block" className={`lg:col-span-3 bg-zinc-50/50 border border-zinc-200/40 p-8 flex flex-col gap-4 ${getRadiusClass()} ${getShadowClass()}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded">Core Resource</span>
                        <h3 className="text-base font-black text-zinc-900 mt-1">Full-Stack Application Node</h3>
                      </div>
                      <span className="text-xs text-zinc-400">Total size: 40KB</span>
                    </div>
                    <p className="text-xs text-zinc-550 leading-relaxed max-w-xl">
                      Standard dashboards use a 1:3 or 1:4 layout ratio. Place simple filters and section indices in the narrow sidebar block, allowing the main area column to breathe and present data.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="border border-zinc-200 p-4 bg-white rounded-lg flex flex-col gap-1" id="subcard_analytics_a">
                        <span className="text-[10px] text-zinc-400 uppercase font-mono font-bold">API STATUS</span>
                        <span className="text-lg font-bold text-zinc-900">400 ms</span>
                      </div>
                      <div className="border border-zinc-200 p-4 bg-white rounded-lg flex flex-col gap-1" id="subcard_analytics_b">
                        <span className="text-[10px] text-zinc-400 uppercase font-mono font-bold">REDUCER DISPATCH</span>
                        <span className="text-lg font-bold text-zinc-900">Optimal (0.2s)</span>
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>

            {/* Layout Class Exporter */}
            <div id="layout_code_panel" className="bg-zinc-950 text-zinc-200 border border-zinc-900 rounded-xl p-5 shadow-lg flex flex-col gap-3">
              <div id="layout_code_header" className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <Code className="text-zinc-500 w-4 h-4" />
                  <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">Layout Code Reference (Tailwind Grid)</span>
                </div>
                <button 
                  id="copy_layout_code_btn"
                  onClick={() => {
                    let layoutCode = '';
                    if (layoutPreset === 'grid-3') {
                      layoutCode = `<div className="grid grid-cols-1 md:grid-cols-3 gap-6">\n  <div className="p-6 bg-zinc-50 border rounded-lg">Card 1</div>\n  <div className="p-6 bg-zinc-50 border rounded-lg">Card 2</div>\n  <div className="p-6 bg-zinc-50 border rounded-lg">Card 3</div>\n</div>`;
                    } else if (layoutPreset === 'bento') {
                      layoutCode = `<div className="grid grid-cols-1 md:grid-cols-4 gap-6">\n  <div className="md:col-span-2 md:row-span-2 bg-indigo-50 p-8 rounded-lg">Large Hero</div>\n  <div className="md:col-span-2 bg-zinc-50 p-6 rounded-lg">Horizon Block</div>\n  <div className="md:col-span-1 bg-zinc-50 p-6 rounded-lg">Module B</div>\n  <div className="md:col-span-1 bg-zinc-900 text-white p-6 rounded-lg">Dark Anchor</div>\n</div>`;
                    } else if (layoutPreset === 'sidebar-split') {
                      layoutCode = `<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">\n  <aside className="lg:col-span-1 bg-zinc-50 p-5 rounded-lg">Sidebar</aside>\n  <main className="lg:col-span-3 bg-zinc-50/50 p-8 rounded-lg">Main Area Content</main>\n</div>`;
                    }
                    triggerCopyFeedback(layoutCode, 'Layout Code');
                  }}
                  className="flex items-center gap-1.5 text-[11px] bg-zinc-900 text-zinc-300 py-1.5 px-3 rounded-md hover:bg-zinc-800 hover:text-white transition-colors border border-zinc-800"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy Layout HTML
                </button>
              </div>

              <div id="layout_code_view" className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-800 font-mono text-zinc-300 text-xs overflow-x-auto whitespace-pre leading-relaxed select-all">
                {layoutPreset === 'grid-3' && (
                  <span>
                    {`<div className="`}
                    <span className="text-emerald-400">grid grid-cols-1 md:grid-cols-3 gap-6</span>
                    {`">`}
                    <br />&nbsp;&nbsp;{`<div className="p-6 bg-zinc-50 rounded-lg">Card 1</div>`}
                    <br />&nbsp;&nbsp;{`<div className="p-6 bg-zinc-50 rounded-lg">Card 2</div>`}
                    <br />&nbsp;&nbsp;{`<div className="p-6 bg-zinc-50 rounded-lg">Card 3</div>`}
                    <br />{`</div>`}
                  </span>
                )}
                {layoutPreset === 'bento' && (
                  <span>
                    {`<div className="`}
                    <span className="text-emerald-400">grid grid-cols-1 md:grid-cols-4 gap-6</span>
                    {`">`}
                    <br />&nbsp;&nbsp;{`<div className="`}
                    <span className="text-emerald-400">md:col-span-2 md:row-span-2 bg-indigo-50 p-8</span>
                    {`">Large Hero</div>`}
                    <br />&nbsp;&nbsp;{`<div className="`}
                    <span className="text-emerald-400">md:col-span-2 bg-zinc-50 p-6</span>
                    {`">Horizon Block</div>`}
                    <br />&nbsp;&nbsp;{`<div className="`}
                    <span className="text-emerald-400">md:col-span-1 bg-zinc-50 p-6</span>
                    {`">Module B</div>`}
                    <br />&nbsp;&nbsp;{`<div className="`}
                    <span className="text-emerald-400">md:col-span-1 bg-zinc-900 text-white p-6</span>
                    {`">Dark Anchor</div>`}
                    <br />{`</div>`}
                  </span>
                )}
                {layoutPreset === 'sidebar-split' && (
                  <span>
                    {`<div className="`}
                    <span className="text-emerald-400">grid grid-cols-1 lg:grid-cols-4 gap-6</span>
                    {`">`}
                    <br />&nbsp;&nbsp;{`<aside className="`}
                    <span className="text-emerald-400">lg:col-span-1 bg-zinc-50 p-5</span>
                    {`">Sidebar</aside>`}
                    <br />&nbsp;&nbsp;{`<main className="`}
                    <span className="text-emerald-400">lg:col-span-3 bg-zinc-50/50 p-8</span>
                    {`">Main Area Content</main>`}
                    <br />{`</div>`}
                  </span>
                )}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: DESIGN PLAYBOOK / ANATOMY */}
        {activeTab === 'anatomy' && (
          <div id="tab_anatomy" className="flex flex-col gap-8 animate-fade-in">
            
            {/* Playbook Intro banner */}
            <div id="playbook_intro_card" className="bg-gradient-to-r from-zinc-900 to-zinc-800 text-white p-8 rounded-xl shadow-md border border-zinc-850 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h2 className="text-lg font-bold">Workspace Aesthetic Guidelines</h2>
                <p className="text-xs text-zinc-300 mt-1 max-w-xl">
                  These underlying design choices make the layout elegant and fluid. Learn how to combine spacing, typography, and borders according to rigorous UI guidelines.
                </p>
              </div>
              <a 
                href="https://tailwindcss.com/docs" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white text-zinc-950 py-2 px-4 rounded-lg hover:bg-zinc-100 transition-colors"
                id="external_tw_link"
              >
                Tailwind Docs <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Principles Blocks */}
            <div id="principles_grid" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Spacing Card */}
              <div id="spacing_theory_card" className="bg-white border border-zinc-200/80 p-6 rounded-xl shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm p-1.5 bg-indigo-50 text-indigo-700 rounded-md">
                      <Sliders className="w-4 h-4" />
                    </span>
                    <h3 className="text-sm font-bold text-zinc-900">1. Spacing Rythms</h3>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                    Avoid identical spacing configurations across components. Dynamic padding variations represent a thoughtful design flow.
                  </p>
                  <div className="bg-zinc-50 border border-zinc-100 rounded-lg p-3 text-[11px] text-zinc-650 font-mono flex flex-col gap-1.5" id="spacing_eg">
                    <div>✅ Compact elements: <span className="text-indigo-600 font-bold">px-3 py-1.5</span></div>
                    <div>✅ Massive Cards: <span className="text-indigo-600 font-bold">p-8 md:p-12</span></div>
                    <div>✅ Layout gap ratios: <span className="text-indigo-600 font-bold">gap-6 md:gap-8</span></div>
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-zinc-400 mt-6 block">Visual rhythm rule</span>
              </div>

              {/* Color Contrast Card */}
              <div id="contrast_theory_card" className="bg-white border border-zinc-200/80 p-6 rounded-xl shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm p-1.5 bg-emerald-50 text-emerald-700 rounded-md">
                      <Palette className="w-4 h-4" />
                    </span>
                    <h3 className="text-sm font-bold text-zinc-900">2. Contrast Anchors</h3>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                    Pair subtle, warm background variations with high-contrast elements. Absolute light themes work best.
                  </p>
                  <div className="bg-zinc-50 border border-zinc-100 rounded-lg p-3 text-[11px] text-zinc-650 font-mono flex flex-col gap-1.5" id="color_eg">
                    <div>✅ App Canvas: <span className="text-emerald-600 font-bold">bg-slate-50</span></div>
                    <div>✅ Element Surface: <span className="text-emerald-600 font-bold">bg-white border-zinc-200</span></div>
                    <div>✅ Main Header text: <span className="text-emerald-600 font-bold">text-zinc-900</span></div>
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-zinc-400 mt-6 block">Accessibility rule</span>
              </div>

              {/* Interactive feedback Card */}
              <div id="feedback_theory_card" className="bg-white border border-zinc-200/80 p-6 rounded-xl shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm p-1.5 bg-rose-50 text-rose-700 rounded-md">
                      <Sparkles className="w-4 h-4" />
                    </span>
                    <h3 className="text-sm font-bold text-zinc-900">3. Interactive Feedback</h3>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                    Utilize transition and scaling to trigger immediate response triggers during click or focus conditions.
                  </p>
                  <div className="bg-zinc-50 border border-zinc-100 rounded-lg p-3 text-[11px] text-zinc-650 font-mono flex flex-col gap-1.5" id="feedback_eg">
                    <div>✅ Hover triggers: <span className="text-rose-600 font-bold">hover:bg-zinc-100</span></div>
                    <div>✅ Smooth curves: <span className="text-rose-600 font-bold">transition-colors duration-150</span></div>
                    <div>✅ Active shrink states: <span className="text-rose-600 font-bold">active:scale-[0.98]</span></div>
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-zinc-400 mt-6 block">Micro-animation rule</span>
              </div>

            </div>

            {/* Design Quote */}
            <div id="custom_quote_card" className="bg-indigo-50 border border-indigo-100/50 p-6 rounded-xl text-center flex flex-col items-center justify-center gap-1">
              <span className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-widest">Architectural Honesty Principle</span>
              <p className="text-xs text-indigo-950 font-medium italic mt-2 max-w-xl">
                "Prism, grids, and perfect alignment define absolute beauty. Avoid messy, unrequested technical clutter in interfaces — focus entirely on elegant typography, color pairs, and high-contrast simplicity."
              </p>
            </div>

          </div>
        )}

      </main>

      {/* Footer Area */}
      <footer id="app_footer" className="bg-white border-t border-zinc-100 px-6 py-6 mt-12 text-center text-xs text-zinc-400">
        <div className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p id="footer_credit">Restored & Built in the Cloud Development Workspace</p>
          <div id="footer_links" className="flex gap-4">
            <span id="footer_auth">Status: Live Sandbox</span>
            <span id="footer_dot" className="text-zinc-200">|</span>
            <span id="footer_vers">SDK v2.4</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
