import 'dart:async';
import 'dart:ui' show ImageFilter;
import 'package:flutter/material.dart';
import 'package:flutter_tabler_icons/flutter_tabler_icons.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ahnara Dispatch Driver',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF0089C1),
          primary: const Color(0xFF0089C1),
          surface: const Color(0xFFE8EFF4),
        ),
        fontFamily: 'SF Pro Display',
        useMaterial3: true,
      ),
      home: const SplashPage(),
    );
  }
}

// ==========================================
// 1. SPLASH SCREEN WIDGET
// ==========================================
class SplashPage extends StatefulWidget {
  const SplashPage({super.key});

  @override
  State<SplashPage> createState() => _SplashPageState();
}

class _SplashPageState extends State<SplashPage> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _logoScale;
  late Animation<double> _logoOpacity;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 3000),
    );

    _logoScale = Tween<double>(begin: 0.5, end: 1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.0, 0.5, curve: Curves.easeOutBack),
      ),
    );

    _logoOpacity = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _controller,
        curve: const Interval(0.0, 0.4, curve: Curves.easeIn),
      ),
    );

    _controller.forward();

    Future.delayed(const Duration(milliseconds: 3500), () {
      if (mounted) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const DriverLoginPage()),
        );
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFD4F475),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ScaleTransition(
              scale: _logoScale,
              child: FadeTransition(
                opacity: _logoOpacity,
                child: Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.3),
                    shape: BoxShape.circle,
                    border: Border.all(color: Colors.white.withOpacity(0.5)),
                  ),
                  child: Image.asset(
                    'assets/logo.png',
                    width: 80,
                    height: 80,
                    errorBuilder: (context, error, stackTrace) {
                      return const Icon(TablerIcons.ambulance, size: 60, color: Color(0xFF001C28));
                    },
                  ),
                ),
              ),
            ),
            const SizedBox(height: 24),
            const Text(
              'AHNARA DISPATCH',
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.w900,
                color: Color(0xFF001C28),
                letterSpacing: 2.0,
              ),
            ),
            const SizedBox(height: 6),
            const Text(
              'Emergency Driver & Telehealth App',
              style: TextStyle(
                fontSize: 12,
                color: Color(0xFF64748B),
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ==========================================
// 2. DRIVER SIGN IN WIDGET
// ==========================================
class DriverLoginPage extends StatefulWidget {
  const DriverLoginPage({super.key});

  @override
  State<DriverLoginPage> createState() => _DriverLoginPageState();
}

class _DriverLoginPageState extends State<DriverLoginPage> {
  final _driverIdController = TextEditingController(text: "DRV-Adeola");
  final _licenseController = TextEditingController(text: "CDL-CLASS-A");
  bool _isLoading = false;

  void _handleLogin() {
    setState(() => _isLoading = true);
    Future.delayed(const Duration(milliseconds: 1500), () {
      if (mounted) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (context) => const DriverDashboardPage(
              driverName: "Adeola Alao",
              vehicleId: "AMB-04",
            ),
          ),
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFE8EFF4),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 32.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Logo
              Center(
                child: Container(
                  padding: const EdgeInsets.all(12),
                  decoration: const BoxDecoration(
                    color: Color(0xFFD4F475),
                    shape: BoxShape.circle,
                  ),
                  child: Image.asset('assets/logo.png', width: 44, height: 44, errorBuilder: (context, e, s) => const Icon(TablerIcons.steering_wheel, size: 44, color: Color(0xFF001C28))),
                ),
              ),
              const SizedBox(height: 24),
              const Text(
                'Driver Login',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 28, fontWeight: FontWeight.w900, color: Color(0xFF001C28), letterSpacing: -1.0),
              ),
              const SizedBox(height: 6),
              const Text(
                'Verify credentials to log into regional dispatch logs',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 12, color: Color(0xFF64748B), fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 36),
              
              // Inputs
              const Text(
                'DRIVER DISPATCH ID',
                style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.grey, letterSpacing: 0.5),
              ),
              const SizedBox(height: 6),
              Container(
                decoration: BoxDecoration(
                  color: const Color(0xFFF1F5F9).withOpacity(0.5),
                  borderRadius: BorderRadius.circular(14),
                ),
                padding: const EdgeInsets.symmetric(horizontal: 14),
                child: TextField(
                  controller: _driverIdController,
                  style: const TextStyle(color: Color(0xFF001C28), fontSize: 14),
                  decoration: const InputDecoration(
                    border: InputBorder.none,
                    hintText: 'e.g. DRV-Adeola',
                    prefixIcon: Icon(TablerIcons.user, size: 16, color: Colors.grey),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              
              const Text(
                'CDL LICENSE NUMBER',
                style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.grey, letterSpacing: 0.5),
              ),
              const SizedBox(height: 6),
              Container(
                decoration: BoxDecoration(
                  color: const Color(0xFFF1F5F9).withOpacity(0.5),
                  borderRadius: BorderRadius.circular(14),
                ),
                padding: const EdgeInsets.symmetric(horizontal: 14),
                child: TextField(
                  controller: _licenseController,
                  style: const TextStyle(color: Color(0xFF001C28), fontSize: 14),
                  decoration: const InputDecoration(
                    border: InputBorder.none,
                    hintText: 'e.g. CDL-CLASS-A',
                    prefixIcon: Icon(TablerIcons.license, size: 16, color: Colors.grey),
                  ),
                ),
              ),
              const SizedBox(height: 32),
              
              SizedBox(
                height: 52,
                child: ElevatedButton(
                  onPressed: _isLoading ? null : _handleLogin,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF001C28),
                    foregroundColor: Colors.white,
                    shape: const StadiumBorder(),
                  ),
                  child: _isLoading
                      ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                      : const Text('Start Shift Duty', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ==========================================
// 3. MAIN DASHBOARD PAGE (DP.01 - DP.05 Integrations)
// ==========================================
class DriverDashboardPage extends StatefulWidget {
  final String driverName;
  final String vehicleId;

  const DriverDashboardPage({
    super.key,
    required this.driverName,
    required this.vehicleId,
  });

  @override
  State<DriverDashboardPage> createState() => _DriverDashboardPageState();
}

class _DriverDashboardPageState extends State<DriverDashboardPage> {
  int _currentIndex = 0;

  // Driver duty status
  String _dutyStatus = "Active Duty"; // Active Duty, Incident Assigned, At Scene, Hospital Transit, Depot
  Color _statusColor = const Color(0xFF10B981);

  // Paramedic Vitals Log (DP.04)
  final _heartRateController = TextEditingController(text: "78");
  final _bpController = TextEditingController(text: "120/80");
  final _spO2Controller = TextEditingController(text: "98");
  final _fetalHeartController = TextEditingController(text: "140");
  final _notesController = TextEditingController(text: "Patient stable in transit. Contractions 5 mins apart.");
  bool _broadcasting = false;

  void _triggerERAlert() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        backgroundColor: Color(0xFF001C28),
        content: Text('ER pre-arrival alert sent. Receiving trauma bay is pre-notified.'),
      ),
    );
  }

  // Panic distress hold tracker (DP.01)
  double _panicHoldProgress = 0.0;
  bool _isHoldingPanic = false;
  Timer? _holdTimer;

  void _startPanicHold() {
    setState(() {
      _isHoldingPanic = true;
      _panicHoldProgress = 0.0;
    });
    _holdTimer = Timer.periodic(const Duration(milliseconds: 100), (timer) {
      setState(() {
        _panicHoldProgress += 0.05;
        if (_panicHoldProgress >= 1.0) {
          _holdTimer?.cancel();
          _triggerPanicAlert();
        }
      });
    });
  }

  void _cancelPanicHold() {
    _holdTimer?.cancel();
    setState(() {
      _isHoldingPanic = false;
      _panicHoldProgress = 0.0;
    });
  }

  void _triggerPanicAlert() {
    setState(() {
      _isHoldingPanic = false;
      _panicHoldProgress = 0.0;
    });
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: Colors.white,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
        title: const Row(
          children: [
            Icon(TablerIcons.alert_octagon, color: Colors.red),
            SizedBox(width: 10),
            Text('CRITICAL SOS ACTIVE', style: TextStyle(color: Color(0xFF001C28), fontWeight: FontWeight.bold)),
          ],
        ),
        content: const Text(
          'One-tap critical panic trigger has transmitted your high-accuracy GPS coordinates & medical logs to central desk. Support is dispatched.',
          style: TextStyle(color: Color(0xFF64748B)),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Dismiss', style: TextStyle(color: Color(0xFF0089C1), fontWeight: FontWeight.bold)),
          )
        ],
      ),
    );
  }

  // Inter-facility Handoff scanner simulator (DP.05)
  bool _scanning = false;
  String _handoffStatus = "Awaiting Barcode Scan";

  void _simulateScan() {
    setState(() {
      _scanning = true;
      _handoffStatus = "Initializing Camera Frame...";
    });
    Future.delayed(const Duration(milliseconds: 1500), () {
      setState(() {
        _handoffStatus = "Validating barcode: TX401-HANDOFF...";
      });
      Future.delayed(const Duration(milliseconds: 1500), () {
        setState(() {
          _scanning = false;
          _handoffStatus = "✓ Transfer Verification Complete. Case Settled.";
        });
      });
    });
  }

  // Notifications bottom sheet logs
  void _showNotificationsBottomSheet() {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      builder: (context) {
        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Notifications',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.w900, color: Color(0xFF001C28)),
                ),
                const SizedBox(height: 16),
                _buildNotificationItem(
                  icon: TablerIcons.alert_triangle,
                  title: 'Emergency SOS Triage Alert',
                  subtitle: 'INC-9201 reported in Sector 4, Yaba',
                  time: 'Just now',
                ),
                _buildNotificationItem(
                  icon: TablerIcons.route,
                  title: 'Route Recalculated',
                  subtitle: 'Surulere traffic diversion bypass active',
                  time: '12 mins ago',
                ),
                const SizedBox(height: 16),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () => Navigator.pop(context),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF001C28),
                      foregroundColor: Colors.white,
                      shape: const StadiumBorder(),
                    ),
                    child: const Text('Close', style: TextStyle(fontWeight: FontWeight.bold)),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildNotificationItem({required IconData icon, required String title, required String subtitle, required String time}) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(color: const Color(0xFF0089C1).withOpacity(0.15), shape: BoxShape.circle),
            child: Icon(icon, size: 16, color: const Color(0xFF0089C1)),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Color(0xFF001C28))),
                Text(subtitle, style: const TextStyle(fontSize: 10, color: Colors.grey)),
              ],
            ),
          ),
          Text(time, style: const TextStyle(fontSize: 8, color: Colors.grey)),
        ],
      ),
    );
  }

  // Profile bottom sheet details
  void _showProfileBottomSheet() {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.white,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      builder: (context) {
        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: const BoxDecoration(color: Color(0xFFD4F475), shape: BoxShape.circle),
                      child: const Icon(TablerIcons.user, size: 28, color: Color(0xFF001C28)),
                    ),
                    const SizedBox(width: 16),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(widget.driverName, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF001C28))),
                        Text('Assigned Unit: ${widget.vehicleId}', style: const TextStyle(fontSize: 12, color: Colors.grey, fontWeight: FontWeight.bold)),
                      ],
                    )
                  ],
                ),
                const SizedBox(height: 24),
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF8FAFC),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: const Color(0xFFE2E8F0)),
                  ),
                  child: const Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('Duty Status', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.grey)),
                          Text('Active Duty', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF10B981))),
                        ],
                      ),
                      Divider(height: 16),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('Vetting Records', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.grey)),
                          Text('Cleared & Approved', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF0089C1))),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),
                SizedBox(
                  width: double.infinity,
                  child: OutlinedButton(
                    onPressed: () {
                      Navigator.pop(context);
                      Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => const DriverLoginPage()));
                    },
                    style: OutlinedButton.styleFrom(
                      foregroundColor: Colors.red,
                      side: const BorderSide(color: Colors.red),
                      shape: const StadiumBorder(),
                    ),
                    child: const Text('End Shift & Log Out', style: TextStyle(fontWeight: FontWeight.bold)),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    // Tab switching
    Widget bodyContent;
    switch (_currentIndex) {
      case 0:
        bodyContent = _buildRouteMapTab();
        break;
      case 1:
        bodyContent = _buildVitalsSyncTab();
        break;
      case 2:
        bodyContent = _buildHandoffScannerTab();
        break;
      case 3:
        bodyContent = _buildDistressPanicTab();
        break;
      default:
        bodyContent = _buildRouteMapTab();
    }

    return Scaffold(
      backgroundColor: const Color(0xFFE8EFF4),
      extendBody: true,
      body: SafeArea(
        bottom: false,
        child: Column(
          children: [
            _buildDashboardHeader(),
            Expanded(
              child: AnimatedSwitcher(
                duration: const Duration(milliseconds: 300),
                switchInCurve: Curves.easeOutCubic,
                switchOutCurve: Curves.easeInCubic,
                transitionBuilder: (Widget child, Animation<double> animation) {
                  return FadeTransition(
                    opacity: animation,
                    child: SlideTransition(
                      position: Tween<Offset>(
                        begin: const Offset(0.0, 0.04),
                        end: Offset.zero,
                      ).animate(animation),
                      child: child,
                    ),
                  );
                },
                child: Container(
                  key: ValueKey<int>(_currentIndex),
                  child: bodyContent,
                ),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: Padding(
        padding: const EdgeInsets.only(left: 16.0, right: 16.0, bottom: 22.0, top: 4.0),
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(28),
            boxShadow: [
              BoxShadow(
                color: const Color(0xFF001C28).withOpacity(0.06),
                blurRadius: 16,
                spreadRadius: 2,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(28),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 12.0, sigmaY: 12.0),
              child: Container(
                height: 80,
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.6),
                  borderRadius: BorderRadius.circular(28),
                  border: Border.all(color: Colors.white.withOpacity(0.5), width: 1.5),
                ),
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    _buildNavItem(0, TablerIcons.map_pin, 'Route Map'),
                    _buildNavItem(1, TablerIcons.activity, 'Vitals Sync'),
                    _buildNavItem(2, TablerIcons.qrcode, 'Scanner'),
                    _buildNavItem(3, TablerIcons.alert_octagon, 'Distress'),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildDashboardHeader() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 12.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  color: const Color(0xFF0089C1).withOpacity(0.2),
                  shape: BoxShape.circle,
                  border: Border.all(color: const Color(0xFF0089C1), width: 1),
                ),
                child: Image.asset('assets/logo.png', width: 22, height: 22, errorBuilder: (c, e, s) => const Icon(TablerIcons.ambulance, size: 22, color: Color(0xFF0089C1))),
              ),
              const SizedBox(width: 8),
              const Text(
                'Ahnara Dispatch',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w900,
                  color: Color(0xFF001C28),
                  letterSpacing: -0.5,
                ),
              ),
            ],
          ),
          
          Row(
            children: [
              // Emergency Button (SOS)
              GestureDetector(
                onTap: _showNotificationsBottomSheet,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFEF2F2),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: const Color(0xFFFCA5A5)),
                  ),
                  child: const Row(
                    children: [
                      Icon(Icons.gpp_maybe_rounded, size: 14, color: Color(0xFFDC2626)),
                      SizedBox(width: 4),
                      Text(
                        'SOS ALERTS',
                        style: TextStyle(fontSize: 10, fontWeight: FontWeight.w900, color: Color(0xFFDC2626)),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: 10),
              
              // Notification Icon
              GestureDetector(
                onTap: _showNotificationsBottomSheet,
                child: Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF8FAFC),
                    shape: BoxShape.circle,
                    border: Border.all(color: const Color(0xFFE2E8F0)),
                  ),
                  child: const Icon(TablerIcons.bell, size: 16, color: Color(0xFF001C28)),
                ),
              ),
              const SizedBox(width: 10),
              
              // Profile Avatar Icon
              GestureDetector(
                onTap: _showProfileBottomSheet,
                child: Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF8FAFC),
                    shape: BoxShape.circle,
                    border: Border.all(color: const Color(0xFFE2E8F0)),
                  ),
                  child: const Icon(TablerIcons.user, size: 16, color: Color(0xFF001C28)),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildNavItem(int index, IconData icon, String label) {
    final isSelected = index == _currentIndex;
    return GestureDetector(
      onTap: () {
        setState(() {
          _currentIndex = index;
        });
      },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected ? const Color(0xFF001C28) : Colors.transparent,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              icon,
              color: isSelected ? Colors.white : Colors.grey.shade400,
              size: 18,
            ),
            if (isSelected) ...[
              const SizedBox(width: 4),
              Text(
                label,
                style: const TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              )
            ]
          ],
        ),
      ),
    );
  }

  // ==========================================
  // DP.03: DRIVER NAVIGATION MAP TAB
  // ==========================================
  Widget _buildRouteMapTab() {
    return Stack(
      children: [
        // Simulated Route Map
        Container(
          color: Colors.white,
          child: Center(
            child: Stack(
              children: [
                Opacity(
                  opacity: 0.08,
                  child: GridPaper(
                    color: const Color(0xFF0089C1),
                    interval: 100,
                    subdivisions: 4,
                    child: Container(),
                  ),
                ),
                Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Text(
                        'ROUTE PATH (SIMULATED MAP)',
                        style: TextStyle(color: Color(0xFF0089C1), fontWeight: FontWeight.bold, fontSize: 10),
                      ),
                      const SizedBox(height: 20),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Container(
                            padding: const EdgeInsets.all(8),
                            decoration: const BoxDecoration(color: Color(0xFF001C28), shape: BoxShape.circle),
                            child: const Icon(TablerIcons.ambulance, color: Colors.white),
                          ),
                          Container(width: 80, height: 2, color: const Color(0xFF0089C1)),
                          Container(
                            padding: const EdgeInsets.all(8),
                            decoration: const BoxDecoration(color: Color(0xFFF8FAFC), shape: BoxShape.circle),
                            child: const Icon(TablerIcons.user, color: Colors.orange),
                          ),
                          Container(width: 80, height: 2, color: Colors.orange),
                          Container(
                            padding: const EdgeInsets.all(8),
                            decoration: const BoxDecoration(color: Color(0xFF001C28), shape: BoxShape.circle),
                            child: const Icon(TablerIcons.building_hospital, color: Colors.red),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),

        // Route details & ER quick action floating panels
        Positioned(
          left: 16,
          right: 16,
          bottom: 110, // Avoid overlapping the bottom nav bar!
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Patient details card
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.95),
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: const Color(0xFFE2E8F0)),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFF001C28).withOpacity(0.04),
                      blurRadius: 10,
                      spreadRadius: 2,
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.between,
                      children: [
                        const Text(
                          'ACTIVE DISPATCH TRANSIT',
                          style: TextStyle(color: Color(0xFF0089C1), fontSize: 10, fontWeight: FontWeight.bold),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                          decoration: BoxDecoration(
                            color: Colors.red.withOpacity(0.15),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: const Text(
                            'OBSTETRIC CRISIS',
                            style: TextStyle(color: Colors.red, fontSize: 9, fontWeight: FontWeight.bold),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      'Pickup: Sector 4, Yaba (Lagos)',
                      style: TextStyle(color: Color(0xFF001C28), fontSize: 15, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 4),
                    const Text(
                      'Destination: LUTH Emergency Room',
                      style: TextStyle(color: Color(0xFF64748B), fontSize: 12),
                    ),
                    const SizedBox(height: 4),
                    const Text(
                      'Clinical Note: Gestational stage 34 weeks, severe complications risk, pre-fill compiler active.',
                      style: TextStyle(color: Color(0xFF64748B), fontSize: 10, italic: true),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 12),
              
              // ER Coordinator Link Button
              ElevatedButton.icon(
                onPressed: _triggerERAlert,
                icon: const Icon(TablerIcons.bell, size: 16),
                label: const Text('ALERT RECEIVING HOSPITAL ER (ETA 5 MINS)'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF001C28),
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  // ==========================================
  // DP.04: PATIENT VITAL TRANSCEIVER TAB
  // ==========================================
  Widget _buildVitalsSyncTab() {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Sync status banner
            Container(
              padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 16),
              decoration: BoxDecoration(
                color: _broadcasting ? const Color(0xFF0089C1).withOpacity(0.1) : Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(
                  color: _broadcasting ? const Color(0xFF0089C1).withOpacity(0.3) : const Color(0xFFE2E8F0),
                ),
              ),
              child: Row(
                children: [
                  Icon(
                    _broadcasting ? TablerIcons.wifi : TablerIcons.wifi_off,
                    color: _broadcasting ? const Color(0xFF0089C1) : const Color(0xFF64748B),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          _broadcasting ? 'Vitals broadcasting live to ER' : 'Telemetry disconnected',
                          style: TextStyle(
                            color: const Color(0xFF001C28),
                            fontWeight: FontWeight.bold,
                            fontSize: 13,
                          ),
                        ),
                        Text(
                          _broadcasting ? 'Synchronized to trauma database' : 'Broadcasting inactive',
                          style: const TextStyle(color: Color(0xFF64748B), fontSize: 10),
                        ),
                      ],
                    ),
                  ),
                  Switch(
                    value: _broadcasting,
                    onChanged: (val) {
                      setState(() => _broadcasting = val);
                    },
                    activeColor: const Color(0xFF0089C1),
                  )
                ],
              ),
            ),
            const SizedBox(height: 24),

            const Text(
              'PARAMEDIC CLINICAL TRANSCEIVER',
              style: TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 1.0),
            ),
            const SizedBox(height: 16),

            // Form inputs
            Row(
              children: [
                Expanded(
                  child: Container(
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: const Color(0xFFE2E8F0)),
                    ),
                    padding: const EdgeInsets.symmetric(horizontal: 14),
                    child: TextField(
                      controller: _heartRateController,
                      keyboardType: TextInputType.number,
                      style: const TextStyle(color: Color(0xFF001C28), fontSize: 14),
                      decoration: const InputDecoration(
                        border: InputBorder.none,
                        labelText: 'Heart Rate (BPM)',
                        labelStyle: TextStyle(color: Color(0xFF64748B)),
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Container(
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: const Color(0xFFE2E8F0)),
                    ),
                    padding: const EdgeInsets.symmetric(horizontal: 14),
                    child: TextField(
                      controller: _bpController,
                      style: const TextStyle(color: Color(0xFF001C28), fontSize: 14),
                      decoration: const InputDecoration(
                        border: InputBorder.none,
                        labelText: 'BP (Sys/Dia)',
                        labelStyle: TextStyle(color: Color(0xFF64748B)),
                      ),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: Container(
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: const Color(0xFFE2E8F0)),
                    ),
                    padding: const EdgeInsets.symmetric(horizontal: 14),
                    child: TextField(
                      controller: _spO2Controller,
                      keyboardType: TextInputType.number,
                      style: const TextStyle(color: Color(0xFF001C28), fontSize: 14),
                      decoration: const InputDecoration(
                        border: InputBorder.none,
                        labelText: 'SpO2 Oxygen (%)',
                        labelStyle: TextStyle(color: Color(0xFF64748B)),
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Container(
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: const Color(0xFFE2E8F0)),
                    ),
                    padding: const EdgeInsets.symmetric(horizontal: 14),
                    child: TextField(
                      controller: _fetalHeartController,
                      keyboardType: TextInputType.number,
                      style: const TextStyle(color: Color(0xFF001C28), fontSize: 14),
                      decoration: const InputDecoration(
                        border: InputBorder.none,
                        labelText: 'Fetal Heart (obstetric)',
                        labelStyle: TextStyle(color: Color(0xFF64748B)),
                      ),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFFE2E8F0)),
              ),
              padding: const EdgeInsets.symmetric(horizontal: 14),
              child: TextField(
                controller: _notesController,
                maxLines: 3,
                style: const TextStyle(color: Color(0xFF001C28), fontSize: 14),
                decoration: const InputDecoration(
                  border: InputBorder.none,
                  labelText: 'Paramedic Assessment Notes',
                  labelStyle: TextStyle(color: Color(0xFF64748B)),
                ),
              ),
            ),
            const SizedBox(height: 24),
            
            SizedBox(
              height: 52,
              child: ElevatedButton(
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      backgroundColor: Color(0xFF001C28),
                      content: Text('Vitals checkpoint logged to local device database.'),
                    ),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF001C28),
                  foregroundColor: Colors.white,
                  shape: const StadiumBorder(),
                ),
                child: const Text('Save Local Snapshot', style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // ==========================================
  // DP.05: INTER-FACILITY REFERRAL SCANNERS
  // ==========================================
  Widget _buildHandoffScannerTab() {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(TablerIcons.qrcode, size: 64, color: Color(0xFF0089C1)),
          const SizedBox(height: 20),
          const Text(
            'Handoff Scanner Interface',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Color(0xFF001C28)),
          ),
          const SizedBox(height: 8),
          const Text(
            'Scan barcode printed or displayed by the sending facility coordinator to verify patient transfer',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 12, color: Color(0xFF64748B), fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 36),
          
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: const Color(0xFFE2E8F0)),
              boxShadow: [
                BoxShadow(
                  color: const Color(0xFF001C28).withOpacity(0.04),
                  blurRadius: 10,
                  spreadRadius: 2,
                )
              ]
            ),
            child: Column(
              children: [
                const Text(
                  'SCANNER STATUS',
                  style: TextStyle(color: Color(0xFF64748B), fontSize: 10, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 8),
                Text(
                  _handoffStatus,
                  textAlign: TextAlign.center,
                  style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700, color: Color(0xFF001C28)),
                ),
              ],
            ),
          ),
          const SizedBox(height: 32),
          
          SizedBox(
            height: 52,
            child: ElevatedButton.icon(
              onPressed: _scanning ? null : _simulateScan,
              icon: _scanning
                  ? const SizedBox(width: 14, height: 14, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                  : const Icon(TablerIcons.camera, size: 18),
              label: const Text('SIMULATE CAMERA BARCODE SCAN'),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF001C28),
                foregroundColor: Colors.white,
                shape: const StadiumBorder(),
              ),
            ),
          ),
        ],
      ),
    );
  }

  // ==========================================
  // DP.01: EMERGENCY SOS PANIC TAB
  // ==========================================
  Widget _buildDistressPanicTab() {
    return Padding(
      padding: const EdgeInsets.all(28.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Icon(TablerIcons.alert_octagon, size: 64, color: Colors.red),
          const SizedBox(height: 16),
          const Text(
            'Emergency Panic Transmitter',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Color(0xFF001C28)),
          ),
          const SizedBox(height: 8),
          const Text(
            'HOLD the distress trigger below for 2 seconds to report critical vehicle accident, hijack, or medical crisis.',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 12, color: Color(0xFF64748B), fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 48),

          // Custom Hold Button
          GestureDetector(
            onTapDown: (_) => _startPanicHold(),
            onTapUp: (_) => _cancelPanicHold(),
            onTapCancel: () => _cancelPanicHold(),
            child: Center(
              child: Stack(
                alignment: Alignment.center,
                children: [
                  SizedBox(
                    width: 160,
                    height: 160,
                    child: CircularProgressIndicator(
                      value: _panicHoldProgress,
                      strokeWidth: 10,
                      backgroundColor: const Color(0xFFE2E8F0),
                      valueColor: const AlwaysStoppedAnimation<Color>(Colors.red),
                    ),
                  ),
                  Container(
                    width: 130,
                    height: 130,
                    decoration: BoxDecoration(
                      color: _isHoldingPanic ? Colors.red.shade900 : Colors.red,
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: Colors.red.withOpacity(0.2),
                          spreadRadius: 8,
                          blurRadius: 16,
                        ),
                      ],
                    ),
                    child: const Center(
                      child: Text(
                        'HOLD TO\nTRIGGER',
                        textAlign: TextAlign.center,
                        style: TextStyle(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 13),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),
          Text(
            _isHoldingPanic ? 'Arming SOS transmitter...' : 'Device GPS tracking: ACTIVE',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 11,
              color: _isHoldingPanic ? Colors.red : const Color(0xFF64748B),
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}
