from cx_Freeze import setup, Executable

includefiles = ['templates', 'static']
includes = ['jinja2.ext']
excludes = ['Tkinter']

setup(
    name='RatW',
    version='0.1',
    description='RatWeb',
    author='HiddenSpot',
    options={'build_exe': {'excludes': excludes, 'includes': includes, 'include_files': includefiles}},
    executables=[Executable('app.py')]
)
