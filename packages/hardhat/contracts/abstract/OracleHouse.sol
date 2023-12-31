// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.17;

import {PriceAware} from "../utils/redstone/PriceAware.sol";
import {IAggregatorV3} from "../interfaces/chainlink/IAggregatorV3.sol";
import {UMAOracleHelper} from "../utils/uma/UMAOracleHelper.sol";
import {IOptimisticOracleV2} from "../interfaces/uma/IOptimisticOracleV2.sol";

abstract contract OracleHouse is PriceAware {
    /**
     * @dev emitted after activeOracle is changed.
     * @param newOracleNumber uint256 oracle id.
     **/
    event ActiveOracleChanged(uint256 newOracleNumber);

    /// Custom errors

    /** Wrong or invalid input*/
    error OracleHouse_invalidInput();

    /** Not initialized*/
    error OracleHouse_notInitialized();

    /** No valid value returned*/
    error OracleHouse_noValue();

    enum OracleIds {
        redstone,
        uma,
        chainlink
    }

    /** @dev OracleIds: 0 = redstone, 1 = uma, 2 = chainlink */
    uint256 internal _activeOracle;

    /// redstone required state variables
    bytes32 private _tickerUsdFiat;
    bytes32 private _tickerReserveAsset;
    bytes32[] private _tickers;
    address private _trustedSigner;

    /// uma required state variables
    UMAOracleHelper private _umaOracleHelper;

    /// chainlink required state variables
    IAggregatorV3 private _addrUsdFiat;
    IAggregatorV3 private _addrReserveAsset;

    // solhint-disable-next-line func-name-mixedcase
    function _oracleHouse_init() internal {
        _oracle_redstone_init();
    }

    /**
     * @notice Returns the active oracle from House of Reserve.
     * @dev Must be implemented in House Of Reserve ONLY.
     */
    function activeOracle() external view virtual returns (uint256);

    /** @dev Override for House of Coin with called inputs from House Of Reserve. */
    function _getLatestPrice(address)
        internal
        view
        virtual
        returns (uint256 price)
    {
        if (_activeOracle == 0) {
            price = _getLatestPriceRedstone(_tickers);
        } else if (_activeOracle == 1) {
            price = _getLatestPriceUMA();
        } else if (_activeOracle == 2) {
            price = _getLatestPriceChainlink(_addrUsdFiat, _addrReserveAsset);
        }
    }

    /**
     * @dev Must be implemented in House of Reserve ONLY with admin restriction and call _setActiveOracle().
     * Must call _setActiveOracle().
     */
    function setActiveOracle(OracleIds id_) external virtual;

    /**
     * @notice Sets the activeOracle.
     * @dev  Restricted to admin only.
     * @param id_ restricted to enum OracleIds
     * Emits a {ActiveOracleChanged} event.
     */

    function _setActiveOracle(OracleIds id_) internal {
        _activeOracle = uint256(id_);
        emit ActiveOracleChanged(_activeOracle);
    }

    ///////////////////////////////
    /// Redstone oracle methods ///
    ///////////////////////////////

    /**
     * @dev emitted after the owner updates trusted signer
     * @param newSigner the address of the new signer
     **/
    event TrustedSignerChanged(address newSigner);

    /**
     * @dev emitted after tickers for Redstone-evm-connector change.
     * @param newtickerUsdFiat short string
     * @param newtickerReserveAsset short string
     **/
    event TickersChanged(
        bytes32 newtickerUsdFiat,
        bytes32 newtickerReserveAsset
    );

    // solhint-disable-next-line func-name-mixedcase
    function _oracle_redstone_init() private {
        _tickers.push(bytes32(0));
        _tickers.push(bytes32(0));
    }

    /**
     * Returns price in 8 decimal places.
     */
    function _getLatestPriceRedstone(bytes32[] memory tickers_)
        internal
        view
        virtual
        returns (uint256 price)
    {
        uint256[] memory oraclePrices = _getPricesFromMsg(tickers_);
        uint256 usdfiat = oraclePrices[0];
        uint256 usdReserveAsset = oraclePrices[1];
        if (usdfiat == 0 || usdReserveAsset == 0) {
            revert OracleHouse_noValue();
        }
        price = (usdReserveAsset * 1e8) / usdfiat;
    }

    /**
     * @notice Returns the state data of Redstone oracle.
     */
    function getRedstoneData()
        external
        view
        virtual
        returns (
            bytes32 tickerUsdFiat_,
            bytes32 tickerReserveAsset_,
            bytes32[] memory tickers_,
            address trustedSigner_
        )
    {
        tickerUsdFiat_ = _tickerUsdFiat;
        tickerReserveAsset_ = _tickerReserveAsset;
        tickers_ = _tickers;
        trustedSigner_ = _trustedSigner;
    }

    /**
     * @notice Checks that signer is authorized
     * @dev  Required by Redstone-evm-connector.
     * @param _receviedSigner address
     */
    function isSignerAuthorized(address _receviedSigner)
        public
        view
        override
        returns (bool)
    {
        return _receviedSigner == _trustedSigner;
    }

    /**
     * @dev See '_setTickers()'.
     * Must be implemented in House of Reserve ONLY with admin restriction.
     * Must call _setTickers().
     */
    function setTickers(
        string calldata tickerUsdFiat_,
        string calldata tickerReserveAsset_
    ) external virtual;

    /**
     * @notice  Sets the tickers required in '_getLatestPriceRedstone()'.
     * @param tickerUsdFiat_ short string (less than 32 characters)
     * @param tickerReserveAsset_ short string (less than 32 characters)
     * Emits a {TickersChanged} event.
     */
    function _setTickers(
        string memory tickerUsdFiat_,
        string memory tickerReserveAsset_
    ) internal {
        if (_tickers.length != 2) {
            revert OracleHouse_notInitialized();
        }
        bytes32 ticker1;
        bytes32 ticker2;
        // solhint-disable-next-line no-inline-assembly
        assembly {
            ticker1 := mload(add(tickerUsdFiat_, 32))
            ticker2 := mload(add(tickerReserveAsset_, 32))
        }
        _tickerUsdFiat = ticker1;
        _tickerReserveAsset = ticker2;

        _tickers[0] = _tickerUsdFiat;
        _tickers[1] = _tickerReserveAsset;

        emit TickersChanged(_tickerUsdFiat, _tickerReserveAsset);
    }

    /**
     * @dev See '_setTickers()'.
     * Must be implemented both in House of Reserve and Coin with admin restriction.
     */
    function authorizeSigner(address _trustedSigner) external virtual;

    /**
     * @notice  Authorize signer for price feed provider.
     * @dev  Restricted to admin only. Function required by Redstone-evm-connector.
     * @param newtrustedSigner address
     * Emits a {TrustedSignerChanged} event.
     */
    function _authorizeSigner(address newtrustedSigner) internal {
        if (newtrustedSigner == address(0)) {
            revert OracleHouse_invalidInput();
        }
        _trustedSigner = newtrustedSigner;
        emit TrustedSignerChanged(_trustedSigner);
    }

    //////////////////////////
    /// UMA oracle methods ///
    //////////////////////////

    /**
     * @dev emitted after the address for UMAHelper changes
     * @param newAddress of UMAHelper
     **/
    event UMAHelperAddressChanged(address newAddress);

    /**
     * Returns price in 8 decimal places.
     */
    function _getLatestPriceUMA() internal view returns (uint256 price) {
        price = _umaOracleHelper.getLastRequest(address(_addrReserveAsset));
    }

    /**
     * @dev See '_setUMAOracleHelper()'.
     * Must be implemented in House of Reserve with admin restriction.
     */
    function setUMAOracleHelper(address newAddress) external virtual;

    /**
     * @notice Sets a new address for the UMAOracleHelper
     * @dev Restricted to admin only.
     * @param newAddress for UMAOracleHelper.
     * Emits a {UMAHelperAddressChanged} event.
     */
    function _setUMAOracleHelper(address newAddress) internal {
        if (newAddress == address(0)) {
            revert OracleHouse_invalidInput();
        }
        _umaOracleHelper = UMAOracleHelper(newAddress);
        emit UMAHelperAddressChanged(newAddress);
    }

    ////////////////////////////////
    /// Chainlink oracle methods ///
    ////////////////////////////////

    /**
     * @dev emitted after chainlink addresses change.
     * @param _newAddrUsdFiat from chainlink.
     * @param _newAddrReserveAsset from chainlink.
     **/
    event ChainlinkAddressChange(
        address _newAddrUsdFiat,
        address _newAddrReserveAsset
    );

    /**
     * Returns price in 8 decimal places.
     */
    function _getLatestPriceChainlink(
        IAggregatorV3 addrUsdFiat_,
        IAggregatorV3 addrReserveAsset_
    ) internal view returns (uint256 price) {
        if (
            address(addrUsdFiat_) == address(0) ||
            address(addrReserveAsset_) == address(0)
        ) {
            revert OracleHouse_notInitialized();
        }
        (, int256 usdfiat, , , ) = addrUsdFiat_.latestRoundData();
        (, int256 usdreserve, , , ) = addrReserveAsset_.latestRoundData();
        if (usdfiat <= 0 || usdreserve <= 0) {
            revert OracleHouse_noValue();
        }
        price = (uint256(usdreserve) * 1e8) / uint256(usdfiat);
    }

    /**
     * @notice Returns the state data of Chainlink oracle.
     */
    function getChainlinkData()
        external
        view
        virtual
        returns (address addrUsdFiat_, address addrReserveAsset_)
    {
        addrUsdFiat_ = address(_addrUsdFiat);
        addrReserveAsset_ = address(_addrReserveAsset);
    }

    /**
     * @dev Must be implemented with admin restriction and call _setChainlinkAddrs().
     */
    function setChainlinkAddrs(address addrUsdFiat_, address addrReserveAsset_)
        external
        virtual;

    /**
     * @notice  Sets the chainlink addresses required in '_getLatestPriceChainlink()'.
     * @param addrUsdFiat_ address from chainlink.
     * @param addrReserveAsset_ address from chainlink.
     * Emits a {ChainlinkAddressChange} event.
     */
    function _setChainlinkAddrs(address addrUsdFiat_, address addrReserveAsset_)
        internal
    {
        if (addrUsdFiat_ == address(0) || addrReserveAsset_ == address(0)) {
            revert OracleHouse_invalidInput();
        }
        _addrUsdFiat = IAggregatorV3(addrUsdFiat_);
        _addrReserveAsset = IAggregatorV3(addrReserveAsset_);
        emit ChainlinkAddressChange(addrUsdFiat_, addrReserveAsset_);
    }
}
